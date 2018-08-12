import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadialBarChart, RadialBar } from 'recharts';
import Chart from './Chart';

const data = [
  { name: 'confused', Points: 71, Total: 341 },
  { name: 'angry', Points: 76, Total: 354 },
  { name: 'happy', Points: 32, Total: 87 },
  { name: 'sad', Points: 60, Total: 278 },
  { name: 'disgust', Points: 93, Total: 542 },
  { name: 'surprise', Points: 59, Total: 274 },
  { name: 'calm', Points: 97, Total: 591 },
];

class SimpleAreaChart extends React.Component {
  render() {
    return (
      <BarChart width={600} height={300} data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Points" fill="#8884d8" />
        <Bar dataKey="Total" fill="#82ca9d" />
      </BarChart>
    );
  }
}

const data2 = [
  { name: '18-24', Age: 31.47, fill: '#8884d8' },
  { name: '25-29', Age: 26.69, fill: '#83a6ed' },
  { name: '30-34', Age: 15.69, pv: 1398, fill: '#8dd1e1' },
  { name: '35-39', Age: 8.22, pv: 9800, fill: '#82ca9d' },
  { name: '40-49', Age: 8.63, pv: 3908, fill: '#a4de6c' },
  { name: '50+', Age: 2.63, pv: 4800, fill: '#d0ed57' },
];

const style = {
  top: 0,
  left: 350,
  lineHeight: '24px'
};


class SimpleRadialBarChart extends React.Component {
  render() {
    return (
      <RadialBarChart width={500} height={300} cx={150} cy={150} innerRadius={20} outerRadius={140} barSize={10} data={data2}>
        <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise={true} dataKey='Age' />
        <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' wrapperStyle={style} />
      </RadialBarChart>
    );
  }
}

class Admin extends React.Component {

  render() {
    return (
      <div className='container row mt-5'>
        <SimpleAreaChart />,
        <Chart />
      </div>
    );
  }
}

export default Admin;

