import React from 'react';
import { Views } from '../Views';

const TopBar = ({
  view,
  setView,
  setExpanded,
  setWidth,
}: {
  view: Views;
  setView: React.Dispatch<React.SetStateAction<Views>>;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div>
      <div className={'header top gw-column'}>
        <div className={'top gw-row space-between align-center'}>
          <i
            className={'gg-arrows-h-alt drag-handle icon-orange'}
            draggable={true}
            onDrag={e => {
              e.persist();
              if (!e.screenX && !e.screenY) return;
              const offsetX = e.nativeEvent.offsetX;
              setWidth(width => {
                const newWidth = width - offsetX;
                if (newWidth < 300) {
                  return 300;
                }
                return newWidth;
              });
            }}
          />
          <i
            onClick={() => setExpanded(expanded => !expanded)}
            className={'gg-close-o close-button icon-orange'}
          />
        </div>
        <h3>Garage-Wall</h3>
      </div>
      <div className={'gw-row space-around'}>
        <div
          className={`tab ` + (view === Views.MAIN ? 'selected' : '')}
          onClick={() => setView(Views.MAIN)}
        >
          Requests
        </div>
        <div
          className={`tab ` + (view === Views.MATCHERS ? 'selected' : '')}
          onClick={() => setView(Views.MATCHERS)}
        >
          Matchers
        </div>
      </div>
    </div>
  );
};

export default TopBar;
