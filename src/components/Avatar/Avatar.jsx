const Avatar = ({ picture }) => {
  return (
    <div className=''>
      <img
        src={picture?.url}
        alt={picture.name}
        className='rounded-full w-12'
      />
    </div>
  );
};

export default Avatar;
