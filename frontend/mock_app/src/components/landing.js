import React from "react";
import "../styles/landing.css";

const Landing = () => (
  <div className="landing">
    <div className="left_side">
        <h1>Dehazing</h1>
        <h3>One tool to see through tough hazy times!</h3>
        <p>With just a click you can remove the dusty winds and windy blurs from an image, video or live stream and increase <b>visibility</b>.</p>
    </div>

    <div className="right_side">
      <img className="image_right" src='https://media.springernature.com/lw685/springer-static/image/art%3A10.1007%2Fs00530-021-00852-z/MediaObjects/530_2021_852_Fig1_HTML.jpg' alt="header_img" />
    </div>
  </div>
);

export default Landing;