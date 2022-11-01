import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectCurrentUser } from "../../../core/features/auth/authSlice";
import { useUpdateUserMutation } from "../../../core/features/users/usersApiSlice";

import useRequireAuthen from "../../../hooks/useRequireAuthen";

import Button from "../../../components/Button/Button";
import useCouter from "../../../hooks/useCouter";

const UserProfile = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { isAuthed, handleAuth } = useRequireAuthen();
  const navigate = useNavigate();

  const [updateUser, { isLoading, isError }] = useUpdateUserMutation();

  const websiteCount = useCouter(0);
  const locationCount = useCouter(0);
  const bioCount = useCouter(0);
  const learningCount = useCouter(0);
  const skillsCount = useCouter(0);
  const currentCount = useCouter(0);
  const availableCount = useCouter(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { id } = currentUser;
  const handleFormSubmit = async (value) => {
    console.log(value);
    // const {
    //   name,
    //   email,
    //   username,
    //   bio,
    //   location,
    //   education,
    //   work,
    //   availableFor,
    //   skills,
    // } = value;

    // if (isAuthed) {
    //   try {
    //     await updateUser({ bio, id }).unwrap();
    //   } catch (error) {
    //     console.log(error);
    //   }
    // } else handleAuth();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="mb-16 space-y-2">
      <div className="bg-white w-full p-4 rounded-md grid gap-4">
        <h2 className="text-4xl font-semibold">User</h2>
        <div className="flex flex-col space-y-2">
          <label htmlFor="name">Name</label>
          <input
            {...register("name")}
            defaultValue={currentUser.name}
            name="name"
            type="text"
            className="border border-solid p-2 rounded-md border-gray-300 cursor-text"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            defaultValue={currentUser.email}
            name="email"
            type="text"
            className="border border-solid p-2 rounded-md border-gray-300 cursor-text"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="username">Username</label>
          <input
            {...register("username")}
            defaultValue={currentUser.username}
            name="username"
            type="text"
            className="border border-solid p-2 rounded-md border-gray-300 cursor-text"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="profile-img">Profile image</label>
          <div className="flex space-x-2">
            <img
              className="rounded-full inline-block w-12 h-12"
              src={currentUser.picture.url}
              alt="profile-img"
            />

            <input
              {...register("profile-img")}
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
            {...register("website")}
            defaultValue={currentUser.website}
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
            {...register("location")}
            defaultValue={currentUser.location}
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
            {...register("bio")}
            defaultValue={currentUser.bio}
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
      </div>
      <div className="bg-white w-full p-4 rounded-md grid gap-4">
        <h2 className="text-4xl font-semibold">Coding</h2>

        <div className="flex flex-col space-y-2">
          <label htmlFor="learning">
            Currently learning
            <p className="text-sm text-gray-400">
              What are you learning right now? What are the new tools and
              languages you're picking up right now?
            </p>
          </label>
          <textarea
            {...register("learning")}
            defaultValue={currentUser.learning}
            cols={1}
            rows={2}
            maxLength={200}
            name="learning"
            type="text"
            className="border border-solid p-2 rounded-md border-gray-300 cursor-text"
            onChange={(e) => learningCount.increment(e.target.value.length)}
          />
          <p className="text-right text-sm text-gray-400">
            <span>{learningCount.count}</span>
            /200
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="skills">
            Skills/Languages
            <p className="text-sm text-gray-400">
              What tools and languages are you most experienced with? Are you
              specialized or more of a generalist?
            </p>
          </label>
          <textarea
            {...register("skills")}
            defaultValue={currentUser.skills}
            cols={1}
            rows={2}
            maxLength={200}
            name="skills"
            type="text"
            placeholder="Any languagues, framworks, etc. to hightlight?"
            className="border border-solid p-2 rounded-md border-gray-300 cursor-text"
            onChange={(e) => skillsCount.increment(e.target.value.length)}
          />
          <p className="text-right text-sm text-gray-400">
            <span>{skillsCount.count}</span>
            /200
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="current">
            Currently working on
            <p className="text-sm text-gray-400">
              What projects are currently occupying most of your time?
            </p>
          </label>
          <textarea
            {...register("current")}
            defaultValue={currentUser.current}
            cols={1}
            rows={2}
            maxLength={200}
            name="current"
            type="text"
            className="border border-solid p-2 rounded-md border-gray-300 cursor-text"
            onChange={(e) => currentCount.increment(e.target.value.length)}
          />
          <p className="text-right text-sm text-gray-400">
            <span>{currentCount.count}</span>
            /200
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="available">
            Available for
            <p className="text-sm text-gray-400">
              What kinds of collaborations or discussions are you available for?
              What's a good reason to say Hey! to you these days?
            </p>
          </label>
          <textarea
            {...register("available")}
            defaultValue={currentUser.avalable}
            cols={1}
            rows={2}
            maxLength={200}
            name="available"
            type="text"
            className="border border-solid p-2 rounded-md border-gray-300 cursor-text"
            onChange={(e) => availableCount.increment(e.target.value.length)}
          />
          <p className="text-right text-sm text-gray-400">
            <span>{availableCount.count}</span>
            /200
          </p>
        </div>
      </div>

      <div className="bg-white w-full p-4 rounded-md grid gap-4">
        <Button isFull hasBg>
          Save Profile Information
        </Button>
      </div>
    </form>
  );
};

export default UserProfile;
