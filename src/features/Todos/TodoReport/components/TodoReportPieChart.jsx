import React, { memo } from "react";
import PropTypes from "prop-types";
import { Pie, defaults } from "react-chartjs-2";

const PieOptions = {
  maintainAspectRatio: false,
  title: {
    display: true,
    text: "Hoàn thành của người dùng",
    fontSize: 23
  }
};

function TodoReportPieChart(props) {
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"],
        hoverOffset: 4
      }
    ]
  };

  return (
    <React.Fragment>
      <Pie width={280} height={280} data={data} options={PieOptions} />
    </React.Fragment>
  );
}

TodoReportPieChart.propTypes = {};

export default memo(TodoReportPieChart);
