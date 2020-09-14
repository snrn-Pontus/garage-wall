import React, { useState } from 'react';
import '../styles/styles.scss';
import { usePendingRequests } from '../usePendingRequests';
import { MockBuilder } from '../index';
import Matchers from './Matchers';
import { Views } from '../Views';
import Requests from './Requests';
import TopBar from './TopBar';

export const GarageWall = ({ mock }: { mock: MockBuilder }) => {
  const [pendingRequests] = usePendingRequests(mock);

  const [expanded, setExpanded] = useState<boolean>(false);

  const [view, setView] = useState<Views>(Views.MAIN);

  const renderContent = () => {
    switch (view) {
      case Views.MAIN:
        return <Requests pendingRequests={pendingRequests} />;
      case Views.MATCHERS:
        return <Matchers mock={mock} />;
    }
  };

  if (!expanded) {
    return (
      <div className={'shadow'}>
        <div
          className={'icon-wrapper'}
          onClick={() => setExpanded(expanded => !expanded)}
        >
          <i className={`gg-sidebar-right`} />
          {pendingRequests.length > 0 && (
            <span className={'request-number'}>{pendingRequests.length}</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`container`}>
      <div className={'column'}>
        <TopBar setExpanded={setExpanded} setView={setView} />
        {renderContent()}
      </div>
    </div>
  );
};
