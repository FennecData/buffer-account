import React from 'react';
import Svg from '../../components/Svg';
import styles from '../css/progress-indicators/CircularIndicator.css';

const CircularIndicator = (props) => {
  const {
    size, progress, initialProgress, showText, classNames, styles: stylesMap,
    strokeWidth,
  } = props;

  const displayedProgress = initialProgress + (progress * (100 - initialProgress) / 100);
  const progressText = (progress === 0 || progress === 100) ?
    progress : progress.toFixed(1);

  const circleRadius = size / 2 - strokeWidth / 2;
  const circleCircumference = 2 * Math.PI * circleRadius;

  const containerClassName = [
    styles.container,
    classNames.container,
  ].join(' ');

  const containerDynamicStyle = {
    width: size,
    height: size,
  };

  const svgDynamicStyle = {
    width: size,
    height: size,
  };

  const circleClassName = [
    styles.circle,
    classNames.circle,
  ].join(' ');

  const circleDynamicStyle = {
    strokeDashoffset: (100 - displayedProgress) * circleCircumference / 100,
    strokeDasharray: circleCircumference,
    strokeWidth,
    ...stylesMap.circle,
  };

  const circleDynamicAttributes = {
    cx: size / 2,
    cy: size / 2,
    r: circleRadius,
  };

  return (
    <div className={containerClassName} style={containerDynamicStyle}>
      <Svg className={styles.svg} style={svgDynamicStyle}>
        <circle
          className={circleClassName}
          style={circleDynamicStyle}
          {...circleDynamicAttributes}
        />
      </Svg>

      {showText &&
        <span className={styles.progressText}>{progressText}</span>}
    </div>
  );
};

CircularIndicator.propTypes = {
  size: React.PropTypes.number.isRequired,
  progress: React.PropTypes.number.isRequired,
  initialProgress: React.PropTypes.number,
  showText: React.PropTypes.bool,
  strokeWidth: React.PropTypes.number,
  classNames: React.PropTypes.shape({
    container: React.PropTypes.string,
    circle: React.PropTypes.string,
  }),
  styles: React.PropTypes.shape({
    circle: React.PropTypes.object,
  }),
};

CircularIndicator.defaultProps = {
  initialProgress: 0,
  showText: false,
  strokeWidth: 2,
  classNames: {
    container: null,
    circle: null,
  },
  styles: {
    circle: {},
  },
};

export default CircularIndicator;
