
# Create React App Template

A no-frills template from which to create React applications with
[Create React App](https://github.com/facebook/create-react-app).

```sh
npx create-react-app my-app --template @appacademy/simple --use-npm
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)





            <ul>
                {commentsArr.reverse().map(comment => (
                    <>
                        <div className='track-comment-item'>
                            <div className='comment-username-ctn'>
                                <span className='comment-username'>{comment.User?.username}</span>
                            </div>
                            <div className='comment-body'>
                                <div className='comment-section-ctn'>
                                    <li
                                        key={comment.id}
                                        // Created a unique class to compare to when making conditional ternary below
                                        className={`comment-${comment.id}-user-${comment.userId}`}
                                        // When cursor hovers over a specific comment, the className will be set to have a unique name
                                        onMouseEnter={(e) => setClassName(e.target.className)}
                                        // When cursor is not on the comment, don't do anything
                                        onMouseLeave={() => setClassName('')}
                                    >
                                        {/* the comment body */}
                                        {openEditCmt && className === `comment-${comment.id}-user-${user?.id}`
                                        ?   <UpdateCommentForm comment={comment} user={user} trackId={+trackId} />
                                        :   comment.message}

                                        {/* Ternary is checking to see if the state variable className matches with the li className */}
                                        {className === `comment-${comment.id}-user-${user?.id}`
                                        // If matches, show edit and delete buttons. Otherwise, don't do anything.
                                        ?
                                            <div className='comment-manip-ctn'>
                                                {!openEditCmt
                                                ?   <>
                                                        <div className='edit-comment-ctn'>
                                                            <button
                                                                type='button'
                                                                className={`comment-${comment.id}-user-${comment.userId}`}
                                                                onClick={(e) => e.currentTarget.className === `comment-${comment.id}-user-${comment.userId}` ? setOpenEditCmt(true) : setOpenEditCmt(false)

                                                                }
                                                            >
                                                                <i className="fa-solid fa-pen"></i>
                                                            </button>
                                                        </div>
                                                        <div className='delete-comment-ctn'>
                                                            <DeleteCommentModal commentId={comment?.id} />
                                                        </div>
                                                    </>
                                                : ""}
                                            </div>
                                        : ""}
                                    </li>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </ul>
