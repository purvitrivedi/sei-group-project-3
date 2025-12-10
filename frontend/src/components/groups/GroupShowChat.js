import React from "react";
import { getUserId } from "../../lib/auth";
import Moment from "react-moment";
import "moment-timezone";

const GroupShowChat = ({
  group,
  messages,
  currentlyDisplayed,
  handleMessageChange,
  text,
  handleMessageSubmit,
  handleMessageDelete,
  handleLikes,
}) => {
  return (
    <div
      className="container Chat"
      style={{
        minHeight: 500,
        display: `${currentlyDisplayed === "chat" ? "block" : "none"}`,
        marginTop: 20,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {messages.map((msg) => {
        const numLikes = msg.likes.length;
        const groupId = group._id;

        return (
          <div key={msg._id}>
            {getUserId() === msg.user._id && (
              <div className="buttons is-right" style={{ height: 5 }}>
                <button onClick={() => handleMessageDelete(groupId, msg._id)}>
                  x
                </button>
              </div>
            )}
            <article className="media">
              <figure className="media-left">
                <p className="image is-64x64">
                  <img src={msg.user.profileImage} alt={msg.user.username} />
                </p>
              </figure>

              <div className="media-content">
                <div className="content">
                  <div>
                    <strong>
                      {msg.user.username.replace(
                        msg.user.username[0],
                        msg.user.username[0].toUpperCase()
                      )}
                    </strong>
                    <br />
                    {msg.text}
                    <br />
                    {numLikes >= 1 && (
                      <p style={{ fontColor: "grey", fontSize: 15 }}>
                        {numLikes}&nbsp;members liked this comment ❤︎
                      </p>
                    )}
                    {msg.user._id !== getUserId() && (
                      <small>
                        <a
                          onClick={() =>
                            handleLikes(groupId, msg._id, msg.likes)
                          }
                          href="null"
                        >
                          Like
                        </a>{" "}
                        ·{/* <a onClick={handleReplyForm}> Reply</a> ·  */}
                        Posted{" "}
                        <Moment fromNow ago>
                          {msg.createdAt}
                        </Moment>{" "}
                        ago
                      </small>
                    )}
                    {msg.user._id === getUserId() && (
                      <small>
                        Posted{" "}
                        <Moment fromNow ago>
                          {msg.createdAt}
                        </Moment>{" "}
                        ago
                      </small>
                    )}
                  </div>
                </div>
              </div>
            </article>
            <hr />
          </div>
        );
      })}

      <article className="media">
        <div className="media-content">
          <div className="field">
            <p className="control">
              <textarea
                className="textarea"
                placeholder="Add a comment..."
                style={{ fontSize: 15 }}
                onChange={handleMessageChange}
                name="text"
                value={text}
              />
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button
                className="button"
                onClick={() => handleMessageSubmit(group._id, text)}
              >
                Post comment
              </button>
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default GroupShowChat;
