import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import universityData from '../universities_data.json'; // Adjust the import path as needed
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../backend/firebase-fetchingDB'; // Adjust the import path as needed
import 'chart.js/auto';

const Dashboard = () => {
  const navigate = useNavigate();

  const [metrics, setMetrics] = useState({
    registeredCandidates: 0,
    registeredUniversities: universityData.length, // Assuming this is the initial value from the local JSON
    availableScholarships: 13 // This is a static value for demonstration
  });

  useEffect(() => {
    // Fetch the total number of students from Firebase
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      setMetrics(prevMetrics => ({
        ...prevMetrics,
        registeredCandidates: querySnapshot.docs.length
      }));
    };

    fetchStudents();
  }, []);

  // Enhanced chart data using actual metrics for demonstration
  const chartData = {
    labels: ['Registered Candidates', 'Registered Universities', 'Available Scholarships'],
    datasets: [
      {
        label: 'University Statistics',
        data: [metrics.registeredCandidates, metrics.registeredUniversities, metrics.availableScholarships],
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1,
        hoverBackgroundColor: [
          'rgba(54, 162, 235, 0.75)',
          'rgba(255, 206, 86, 0.75)',
          'rgba(75, 192, 192, 0.75)'
        ],
        hoverBorderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1">
        <div className="p-10">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <hr className="my-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-6 bg-white rounded-lg shadow">
              <Bar data={chartData} options={options} />
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <Doughnut data={chartData} options={options} />
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <Line data={chartData} options={options} />
            </div>
            <div className="p-6 bg-white rounded-lg shadow flex flex-col items-center justify-center">
              <span className="text-gray-600">Registered Candidates</span>
              <span className="text-4xl font-semibold">{metrics.registeredCandidates}</span>
            </div>
            <div className="p-6 bg-white rounded-lg shadow flex flex-col items-center justify-center">
              <span className="text-gray-600">Registered Universities</span>
              <span className="text-4xl font-semibold">{metrics.registeredUniversities}</span>
            </div>
            <div className="p-6 bg-white rounded-lg shadow flex flex-col items-center justify-center">
              <span className="text-gray-600">Available Scholarships</span>
              <span className="text-4xl font-semibold">{metrics.availableScholarships}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
