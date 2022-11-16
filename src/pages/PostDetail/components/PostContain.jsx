import ContentMarkdown from "../../../components/ContentMarkdown/ContentMarkdown";
const markdown = `
## JavaScript code example:
 
~~~javascript
// function that adds "2 numbers" together
const sumTwoNumbers = (num1, num2) => num1 + num2;
 
// call the function
console.log(sumTwoNumbers(1, 2)); // 3
 
// array of users
const users = [
  { name: "John", age: 30 },
  { name: "Jane", age: 28 },
  { name: "Bob", age: 25 },
];
 
// print out the users age 
console.log(users.map(user => user.age)); // [30, 28, 25]
~~~

### Another content
![My GIF](https://www.copycat.dev/blog/wp-content/uploads/2022/08/ezgif-1-cf3e454564.gif)
`;
const PostContent = () => {
  return (
    <div className="border bg-white rounded-md border-solid">
      <img
        src="https://res.cloudinary.com/practicaldev/image/fetch/s--PJ7b0oVu--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/l5dzuotlrsxw2z2lsxua.png"
        alt="bg"
        className="rounded-t-md"
      />
      <div>
        <div className="p-4 md:px-12 md:py-8 space-y-4">
          <div className="flex gap-2">
            <img
              src="http://res.cloudinary.com/drkdy5tsq/image/upload/v1668413477/pictures/xwzoluksggajcqc3zzgy.jpg"
              alt="abc"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h4 className="text-md font-semibold">freeman</h4>
              <p className="text-sm text-gray-500">Posted on Nov 15</p>
            </div>
          </div>

          <h1 className="text-5xl font-semibold">
            Highest Paying Jobs for Developer
          </h1>
          <div className="space-x-2">
            <a href="#!">#startup</a>
            <a href="#!">#productivity</a>
            <a href="#!">#career</a>
            <a href="#!">#news</a>
          </div>
          <div>
            <ContentMarkdown children={markdown} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostContent;
