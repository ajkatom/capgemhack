import React, { Component } from 'react';

const Chart = () => {
  google.charts.load('current', { packages: ['corechart'] });
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    let draw = document.getElementById('piechart_3d');
    var data = google.visualization.arrayToDataTable([
      ['sentiment', 'Hours per Day'],
      ['confused', 8],
      ['angry', 8],
      ['happy', 2],
      ['sad', 6],
      ['calm', 9],
      ['surprise', 5],
      ['disgust', 9]
    ]);

    var options = {
      title: 'My Day',
      is3D: true
    };

    var chart = new google.visualization.PieChart(draw);
    chart.draw(data, options);
  }

  return <div id="piechart_3d" />;
};

export default Chart;
