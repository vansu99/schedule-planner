import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';

const PieOptions = {
  maintainAspectRatio: false,
  title: {
    display: true,
    text: 'Hoàn thành của người dùng',
    fontSize: 23,
  },
};

function TodoReportPieChart({ completed, failed }) {
  const data = {
    labels: ['Quá hạn', 'Hoàn thành'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [failed, completed],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <React.Fragment>
      <Pie width={280} height={280} data={data} options={PieOptions} />
    </React.Fragment>
  );
}

TodoReportPieChart.propTypes = {
  completed: PropTypes.string,
  failed: PropTypes.string,
};

export default memo(TodoReportPieChart);
