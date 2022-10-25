import Button from "../../components/Button/Button";
import RouteWrapper from "../../components/RouteWrapper/RouteWrapper";

const Dashboard = () => {
  return (
    <RouteWrapper>
      <div className="max-w-[1280px] mx-auto grid gap-4 grid-cols-[240px_1fr]">
        <main className="space-y-4 col-span-2">
          <header className="block">
            <h1 className="text-3xl font-semibold">Dashboard</h1>
          </header>
          <div className="grid grid-cols-4 gap-2">
            <div className="flex flex-col border border-solid rounded-md bg-white p-6">
              <strong className="text-2xl">0</strong>
              <span>Total post reactions</span>
            </div>
            <div className="flex flex-col border border-solid rounded-md bg-white p-6">
              <strong className="text-2xl">&lt; 500</strong>
              <span>Total post views</span>
            </div>
            <div className="flex flex-col border border-solid rounded-md bg-white p-6">
              <strong className="text-2xl">0</strong>
              <span>Listings created</span>
            </div>
            <div className="flex flex-col border border-solid rounded-md bg-white p-6">
              <strong className="text-2xl">0</strong>
              <span>Credits available</span>
            </div>
          </div>
        </main>
        <aside className="">
          <ul className="space-y-1">
            <li className="p-2 hover:bg-blue-200 hover:rounded-md">
              <a className="flex justify-between">
                Posts
                <span className="bg-gray-200 px-1 rounded-lg">0</span>
              </a>
            </li>
            <li className="p-2 hover:bg-blue-200 hover:rounded-md">
              <a className="flex justify-between">
                Followers
                <span className="bg-gray-200 px-1 rounded-lg">0</span>
              </a>
            </li>
            <li className="p-2 hover:bg-blue-200 hover:rounded-md">
              <a className="flex justify-between">
                Following tags
                <span className="bg-gray-200 px-1 rounded-lg">0</span>
              </a>
            </li>
            <li className="p-2 hover:bg-blue-200 hover:rounded-md">
              <a className="flex justify-between">
                Following users
                <span className="bg-gray-200 px-1 rounded-lg">0</span>
              </a>
            </li>
          </ul>
        </aside>
        <section className="">
          <div>
            <h2 className="text-xl font-semibold">Posts</h2>
          </div>
          <div className="border border-solid bg-white rounded-md p-16 mx-auto flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <img
                className="w-[300px] mb-10"
                src="https://res.cloudinary.com/practicaldev/image/fetch/s--XHE_XeFn--/c_imagga_scale,f_auto,fl_progressive,q_auto,w_300/https://dev-to-uploads.s3.amazonaws.com/i/y5767q6brm62skiyywvc.png"
                alt="no-post"
              />
              <p>
                This is where you can manage your posts, but you haven't written
                anything yet.
              </p>
              <p>
                <Button hasBg>Write your first post now</Button>
              </p>
            </div>
          </div>
        </section>
      </div>
    </RouteWrapper>
  );
};

export default Dashboard;
