import React from 'react';
import { Views } from '../Views';

const TopBar = ({
  setView,
  setExpanded,
}: {
  setView: React.Dispatch<React.SetStateAction<Views>>;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className={'top'}>
      <div className={'column'}>
        <i
          onClick={() => setExpanded(expanded => !expanded)}
          className={'gg-close-o close-button icon-orange'}
        />
        <h3>Garage-Wall</h3>
        <i
          className={'gg-menu-round icon-orange'}
          onClick={() => {
            setView(view =>
              view === Views.MAIN ? Views.MATCHERS : Views.MAIN
            );
          }}
        />
      </div>
    </div>
  );
};

export default TopBar;
