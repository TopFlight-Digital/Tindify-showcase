import pollCallback from '@utils/poll/pollCallback';
import isStandardBrowser from '@utils/common/isStandardBrowser';
import startExperiment from './experiment';
import styles from './styles';

const appendStyles = () => {
  const styleTag = document.createElement('style');
  styleTag.textContent = styles;
  document.head.appendChild(styleTag);
};

export function init(cb: (...args: any[]) => any) {
  pollCallback(['body'], cb);
}

const initTestConditions = () => {
  if (isStandardBrowser()) {
    appendStyles();
    init(startExperiment);
  }
};

initTestConditions();
