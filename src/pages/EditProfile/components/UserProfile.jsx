import Button from "../../../components/Button/Button";
import useCouter from "../../../hooks/useCouter";

const UserProfile = () => {
  const websiteCount = useCouter(0);
  const locationCount = useCouter(0);
  const bioCount = useCouter(0);

  return (
    <div className="mb-16">
      <div className="bg-white w-full p-4 rounded-md grid gap-4">
        <h2 className="text-4xl font-semibold">User</h2>
        <div className="flex flex-col space-y-2">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            className="border border-solid p-2 rounded-md border-gray-300 cursor-text"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            className="border border-solid p-2 rounded-md border-gray-300 cursor-text"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            className="border border-solid p-2 rounded-md border-gray-300 cursor-text"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="profile-img">Profile image</label>
          <div className="flex space-x-2">
            <span>
              <img
                className="w-12 h-12 rounded-full"
                src="http://res.cloudinary.com/drkdy5tsq/image/upload/v1665634943/Profiles/ep8km7ckf3donawg7jze.jpg"
                alt="profile-img"
              />
            </span>
            <input
              name="profile-img"
              type="file"
              className="w-full border border-solid p-2 rounded-md border-gray-300 cursor-text"
            />
          </div>
        </div>
      </div>
      <div className="bg-white w-full p-4 rounded-md grid gap-4">
        <h2 className="text-4xl font-semibold">Basic</h2>
        <div className="flex flex-col space-y-2">
          <label htmlFor="website">Website URL</label>
          <input
            maxLength={100}
            name="website"
            type="text"
            placeholder="https://yoursite.com"
            className="border border-solid p-2 rounded-md border-gray-300 cursor-text"
            onChange={(e) => websiteCount.increment(e.target.value.length)}
          />
          <p className="text-right text-sm text-gray-400">
            <span>{websiteCount.count}</span>
            /100
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="location">Location</label>
          <input
            maxLength={100}
            name="location"
            type="text"
            placeholder="HCMC, Vietnam"
            className="border border-solid p-2 rounded-md border-gray-300 cursor-text"
            onChange={(e) => locationCount.increment(e.target.value.length)}
          />
          <p className="text-right text-sm text-gray-400">
            <span>{locationCount.count}</span>
            /100
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="bio">Bio</label>
          <textarea
            maxLength={200}
            name="bio"
            type="text"
            placeholder="A short bio..."
            className="border border-solid p-2 rounded-md border-gray-300 cursor-text"
            onChange={(e) => bioCount.increment(e.target.value.length)}
          />
          <p className="text-right text-sm text-gray-400">
            <span>{bioCount.count}</span>
            /200
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <Button isFull hasBg>
            Save Profile Information
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
