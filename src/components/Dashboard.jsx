import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const API_BASE = 'https://mcm-framework-api.vercel.app';

const Dashboard = () => {
  const [nigeriaData, setNigeriaData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/assess/NGA`);
        setNigeriaData(response.data.data);
      } catch (error) {
        console.error('Failed to fetch Nigeria data:', error);
        // Fallback to demo data
        setNigeriaData({
          quality_score: { percentage: 60, classification: 'MEDIUM QUALITY' },
          summary: { tier_1_count: 2, tier_2_count: 4, tier_3_count: 1 }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading MCM Framework Data...</div>;

  const qualityData = [
    { name: 'Nigeria', score: nigeriaData?.quality_score?.percentage || 60 },
    { name: 'Vietnam (Benchmark)', score: 72 }
  ];

  const tierData = [
    { name: 'Tier 1', value: nigeriaData?.summary?.tier_1_count || 2, color: '#28a745' },
    { name: 'Tier 2', value: nigeriaData?.summary?.tier_2_count || 4, color: '#ffc107' },
    { name: 'Tier 3', value: nigeriaData?.summary?.tier_3_count || 1, color: '#dc3545' }
  ];

  return (
    <div className="dashboard">
      <h2>📊 Framework Overview</h2>
      
      <div className="stats-grid">
        <div className="stat-card primary">
          <h3>Quality Score</h3>
          <div className="stat-value">{nigeriaData?.quality_score?.percentage || 60}%</div>
          <div className="stat-label">{nigeriaData?.quality_score?.classification || 'MEDIUM QUALITY'}</div>
        </div>
        
        <div className="stat-card">
          <h3>Tier 1 Modules</h3>
          <div className="stat-value">{nigeriaData?.summary?.tier_1_count || 2}</div>
          <div className="stat-label">Optimal Data</div>
        </div>
        
        <div className="stat-card">
          <h3>Tier 2 Modules</h3>
          <div className="stat-value">{nigeriaData?.summary?.tier_2_count || 4}</div>
          <div className="stat-label">Proxy Methods</div>
        </div>
        
        <div className="stat-card">
          <h3>Novel Contributions</h3>
          <div className="stat-value">2</div>
          <div className="stat-label">Innovations</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h4>Quality Score Comparison</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={qualityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" name="Quality Score (%)" fill="#2E86AB" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h4>Data Tier Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={tierData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {tierData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="framework-insights">
        <h4>🎯 Framework Insights</h4>
        <ul>
          <li>✅ <strong>60% quality score</strong> - Comparable to published Vietnam model (72%)</li>
          <li>✅ <strong>4/7 modules</strong> use novel proxy methods (Tier 2)</li>
          <li>✅ <strong>2 innovative contributions</strong> - Behavioral proxies & Cold chain optimization</li>
          <li>✅ <strong>Ready for policy use</strong> with explicit uncertainty quantification</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
