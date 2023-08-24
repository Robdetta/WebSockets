//return HTML that will look good in the DOM for messages
const buildMessageHtml = (messageObj: {
  newMessage: string;
  userName: string;
  date: Date;
  avatar: string;
}) => {
  return `<li>
                <div class="user-image">
                    <img src=${messageObj.avatar} />
                </div>
                <div class="user-message">
                    <div class="user-name-time">${` ${messageObj.userName} `}<span>${new Date(
                      messageObj.date,
                    ).toLocaleString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}</span></div>
                    <div class="message-text">${messageObj.newMessage}</div>
                </div>
              </li>
              `;
};

export { buildMessageHtml };
