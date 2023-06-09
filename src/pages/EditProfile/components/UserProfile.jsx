import { yupResolver } from '@hookform/resolvers/yup';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { selectCurrentUser } from '../../../core/features/auth/authSlice';
import { useUpdateUserMutation } from '../../../core/features/users/usersApiSlice';

import useRequireAuthen from '../../../hooks/useRequireAuthen';
import Button from '../../../components/Button/Button';
import defaultAvatar from '../../../assets/images/default-avatar.png';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';

import useBase64 from '../../../hooks/useBase64';
import useCouter from '../../../hooks/useCouter';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const profileSchema = yup.object().shape({
  name: yup.string().trim(),
  email: yup.string().email('Please input a valid email address'),
  username: yup
    .string()
    .matches(/^\S*$/, 'Whitespace is not allowed in your username'),
  files: yup
    .mixed()
    .test('type', 'Allowed file types: jpg, .png, .jpeg', (file) => {
      if (file.length) {
        return file && file[0] && SUPPORTED_FORMATS.includes(file[0].type);
      } else {
        return true;
      }
    }),
  website: yup
    .string()
    .matches(
      /^((https?):\/\/)?(www\.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(\/[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      
      {
        message: 'Invalid URL',
        excludeEmptyString: true,
      }
    ),
  location: yup.string().trim(),
  bio: yup.string().trim(),
  learning: yup.string().trim(),
  skills: yup.string().trim(),
  workingOn: yup.string().trim(),
  availableFor: yup.string().trim(),
  workingAt: yup.string().trim(),
  education: yup.string().trim(),
});

const UserProfile = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [file, setFile] = useState(currentUser.picture?.url);
  const previewAvatar = useBase64(file);
  const { isAuthed, handleAuth } = useRequireAuthen();
  const navigate = useNavigate();

  const [updateUser, { isLoading, isError }] = useUpdateUserMutation();

  const websiteCount = useCouter(currentUser.website?.length || 0);
  const locationCount = useCouter(currentUser.location?.length || 0);
  const bioCount = useCouter(currentUser.bio?.length || 0);
  const learningCount = useCouter(currentUser.learning?.length || 0);
  const skillsCount = useCouter(currentUser.skills?.length || 0);
  const workingOnCount = useCouter(currentUser.workingOn?.length || 0);
  const availableForCount = useCouter(currentUser.availableFor?.length || 0);
  const workingAtCount = useCouter(currentUser.workingAt?.length || 0);
  const educationCount = useCouter(currentUser.education?.length || 0);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
  } = useForm({
    defaultValues: {
      name: currentUser?.name,
      email: currentUser?.email,
      username: currentUser?.username,
      files: '',
      website: currentUser?.website || '',
      location: currentUser?.location || '',
      bio: currentUser?.bio || '',
      education: currentUser?.education || '',
      workingAt: currentUser?.workingAt || '',
      workingOn: currentUser?.workingOn || '',
      availableFor: currentUser?.availableFor || '',
      learning: currentUser?.learning || '',
      skills: currentUser?.skills || '',
    },
    mode: 'all',
    // reValidateMode: "onChange",
    resolver: yupResolver(profileSchema),
  });

  const { id } = currentUser;
  const handleFormSubmit = async (data) => {
    const {
      name,
      bio,
      website,
      location,
      education,
      workingAt,
      workingOn,
      availableFor,
      learning,
      skills,
    } = data;

    if (isAuthed) {
      try {
        await updateUser({
          id,
          file,
          // name,
          // picture: {
          //   url: file,
          //   publicId: currentUser.picture?.publicId,
          // },
          // website,
          // location,
          // bio,
          // learning,
          // skills,
          // workingOn,
          // availableFor,
          // workingAt,
          // education,
        }).unwrap();
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    } else handleAuth();
  };

  return (
    <Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className='mb-16 space-y-2'
        >
          <div className='bg-white w-full p-4 rounded-md grid gap-4'>
            <h2 className='text-4xl font-semibold'>User</h2>
            <div className='flex flex-col space-y-2'>
              <label htmlFor='name'>Name</label>
              <input
                {...register('name')}
                // defaultValue={currentUser.name}
                name='name'
                type='text'
                id='name'
                className='border border-solid p-2 rounded-md border-gray-300 cursor-text'
              />
            </div>
            <div className='flex flex-col space-y-2'>
              <label htmlFor='email'>Email</label>
              <input
                {...register('email')}
                // defaultValue={currentUser.email}
                name='email'
                id='email'
                type='text'
                disabled
                className='border border-solid p-2 rounded-md border-gray-300 cursor-text'
              />
              {errors.email && (
                <p className='text-red-400'>{errors.email.message}</p>
              )}
            </div>
            <div className='flex flex-col space-y-2'>
              <label htmlFor='username'>Username</label>
              <input
                {...register('username')}
                // defaultValue={currentUser.username}
                name='username'
                id='username'
                disabled
                type='text'
                className='border border-solid p-2 rounded-md border-gray-300 cursor-text'
              />
              {errors.username && (
                <p className='text-red-400'>{errors.username.message}</p>
              )}
            </div>
            <div className='flex flex-col space-y-2'>
              <label htmlFor='image'>Profile image</label>
              <div className='flex space-x-2'>
                <img
                  className='rounded-full inline-block w-12 h-12'
                  src={errors.files ? defaultAvatar : previewAvatar.toString()}
                  alt='Pick your avatar'
                />

                <input
                  {...register('files')}
                  onChange={(e) => setFile(e.target.files[0])}
                  name='files'
                  type='file'
                  id='image'
                  accept='image/*'
                  className='w-full border border-solid p-2 rounded-md border-gray-300 cursor-text'
                />
              </div>
              {errors.files && (
                <p className='text-red-400'>{errors.files.message}</p>
              )}
            </div>
          </div>
          <div className='bg-white w-full p-4 rounded-md grid gap-4'>
            <h2 className='text-4xl font-semibold'>Basic</h2>
            <div className='flex flex-col space-y-2'>
              <label htmlFor='website'>Website URL</label>
              <input
                {...register('website')}
                // defaultValue={currentUser.website || ""}
                maxLength={100}
                name='website'
                type='text'
                id='website'
                placeholder='https://yoursite.com'
                className='border border-solid p-2 rounded-md border-gray-300 cursor-text'
                onChange={(e) => websiteCount.increment(e.target.value.length)}
              />
              {errors.website && (
                <p className='text-red-400'>{errors.website.message}</p>
              )}
              <p className='text-right text-sm text-gray-400'>
                <span>{websiteCount.count}</span>
                /100
              </p>
            </div>
            <div className='flex flex-col space-y-2'>
              <label htmlFor='location'>Location</label>
              <input
                {...register('location')}
                // defaultValue={currentUser.location || ""}
                maxLength={100}
                name='location'
                id='location'
                type='text'
                placeholder='HCMC, Vietnam'
                className='border border-solid p-2 rounded-md border-gray-300 cursor-text'
                onChange={(e) => locationCount.increment(e.target.value.length)}
              />
              {errors.location && (
                <p className='text-red-400'>{errors.location.message}</p>
              )}
              <p className='text-right text-sm text-gray-400'>
                <span>{locationCount.count}</span>
                /100
              </p>
            </div>
            <div className='flex flex-col space-y-2'>
              <label htmlFor='bio'>Bio</label>
              <textarea
                {...register('bio')}
                // defaultValue={currentUser.bio || ""}
                maxLength={200}
                name='bio'
                id='bio'
                type='text'
                placeholder='A short bio...'
                className='border border-solid p-2 rounded-md border-gray-300 cursor-text'
                onChange={(e) => bioCount.increment(e.target.value.length)}
              />
              {errors.bio && (
                <p className='text-red-400'>{errors.bio.message}</p>
              )}
              <p className='text-right text-sm text-gray-400'>
                <span>{bioCount.count}</span>
                /200
              </p>
            </div>
          </div>
          <div className='bg-white w-full p-4 rounded-md grid gap-4'>
            <h2 className='text-4xl font-semibold'>Coding</h2>

            <div className='flex flex-col space-y-2'>
              <label htmlFor='learning'>
                Currently learning
                <p className='text-sm text-gray-400'>
                  What are you learning right now? What are the new tools and
                  languages you're picking up right now?
                </p>
              </label>
              <textarea
                {...register('learning')}
                // defaultValue={currentUser.learning || ""}
                cols={1}
                rows={2}
                maxLength={200}
                name='learning'
                id='learning'
                type='text'
                className='border border-solid p-2 rounded-md border-gray-300 cursor-text'
                onChange={(e) => learningCount.increment(e.target.value.length)}
              />
              {errors.learning && (
                <p className='text-red-400'>{errors.learning.message}</p>
              )}
              <p className='text-right text-sm text-gray-400'>
                <span>{learningCount.count}</span>
                /200
              </p>
            </div>
            <div className='flex flex-col space-y-2'>
              <label htmlFor='skills'>
                Skills/Languages
                <p className='text-sm text-gray-400'>
                  What tools and languages are you most experienced with? Are
                  you specialized or more of a generalist?
                </p>
              </label>
              <textarea
                {...register('skills')}
                // defaultValue={currentUser.skills || ""}
                cols={1}
                rows={2}
                maxLength={200}
                name='skills'
                id='skills'
                type='text'
                placeholder='Any languagues, framworks, etc. to hightlight?'
                className='border border-solid p-2 rounded-md border-gray-300 cursor-text'
                onChange={(e) => skillsCount.increment(e.target.value.length)}
              />
              <p className='text-right text-sm text-gray-400'>
                <span>{skillsCount.count}</span>
                /200
              </p>
            </div>
            <div className='flex flex-col space-y-2'>
              <label htmlFor='workingOn'>
                Currently working on
                <p className='text-sm text-gray-400'>
                  What projects are currently occupying most of your time?
                </p>
              </label>
              <textarea
                {...register('workingOn')}
                // defaultValue={currentUser.workingOn || ""}
                cols={1}
                rows={2}
                maxLength={200}
                name='workingOn'
                id='workingOn'
                type='text'
                className='border border-solid p-2 rounded-md border-gray-300 cursor-text'
                onChange={(e) =>
                  workingOnCount.increment(e.target.value.length)
                }
              />
              <p className='text-right text-sm text-gray-400'>
                <span>{workingOnCount.count}</span>
                /200
              </p>
            </div>
            <div className='flex flex-col space-y-2'>
              <label htmlFor='availableFor'>
                Available for
                <p className='text-sm text-gray-400'>
                  What kinds of collaborations or discussions are you available
                  for? What's a good reason to say Hey! to you these days?
                </p>
              </label>
              <textarea
                {...register('availableFor')}
                // defaultValue={currentUser.availableFor || ""}
                cols={1}
                rows={2}
                maxLength={200}
                name='availableFor'
                id='availableFor'
                type='text'
                className='border border-solid p-2 rounded-md border-gray-300 cursor-text'
                onChange={(e) =>
                  availableForCount.increment(e.target.value.length)
                }
              />
              <p className='text-right text-sm text-gray-400'>
                <span>{availableForCount.count}</span>
                /200
              </p>
            </div>
          </div>
          <div className='bg-white w-full p-4 rounded-md grid gap-4'>
            <h2 className='text-4xl font-semibold'>Work</h2>
            <div className='flex flex-col space-y-2'>
              <label htmlFor='workingAt'>Work</label>
              <input
                {...register('workingAt')}
                // defaultValue={currentUser.workingAt || ""}
                maxLength={100}
                name='workingAt'
                type='text'
                id='workingAt'
                placeholder='What do you do? Example: Senior Devaloper @ Officience .ltd'
                className='border border-solid p-2 rounded-md border-gray-300 cursor-text'
                onChange={(e) =>
                  workingAtCount.increment(e.target.value.length)
                }
              />
              {errors.workingAt && (
                <p className='text-red-400'>{errors.workingAt.message}</p>
              )}
              <p className='text-right text-sm text-gray-400'>
                <span>{workingAtCount.count}</span>
                /100
              </p>
            </div>
            <div className='flex flex-col space-y-2'>
              <label htmlFor='education'>Education</label>
              <input
                {...register('education')}
                // defaultValue={currentUser.education || ""}
                maxLength={100}
                name='education'
                id='education'
                type='text'
                placeholder='What did you go to school?'
                className='border border-solid p-2 rounded-md border-gray-300 cursor-text'
                onChange={(e) =>
                  educationCount.increment(e.target.value.length)
                }
              />
              {errors.education && (
                <p className='text-red-400'>{errors.education.message}</p>
              )}
              <p className='text-right text-sm text-gray-400'>
                <span>{educationCount.count}</span>
                /100
              </p>
            </div>
          </div>
          <div className='bg-white w-full p-4 rounded-md grid gap-4'>
            <Button isFull hasBg disabled={!isDirty}>
              Save Profile Information
            </Button>
          </div>
        </form>
      )}
    </Fragment>
  );
};

export default UserProfile;
