import { useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';

import Portal from '../Portal';

const ProfileCard = ({
  coords,
  updateTooltipCoords,
  isOpen,
  setOn,
  children,
}) => {
  const nodeRef = useRef(null);
  useEffect(() => {
    if (!isOpen) return null;

    const updateCoords = debounce(updateTooltipCoords, 100);
    window.addEventListener('resize', updateCoords);
    return () => window.removeEventListener('resize', updateCoords);
  }, [updateCoords]);
  return (
    <Portal>
      <div
        ref={nodeRef}
        onMouseEnter={setOn}
        onMouseLeave={setOn}
        style={{ ...coords }}
        className='absolute h-32 text-centerrounded-md bg-slate-400 rounded-md w-72'
      >
        <div>{children}</div>
      </div>
    </Portal>
  );
};

export default ProfileCard;
