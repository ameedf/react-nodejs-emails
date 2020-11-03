import React, { Component } from 'react';

class MessagesPage extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      selectedMessage: null,
    }
    this.fromInput = React.createRef();
    this.toInput = React.createRef();
    this.subjectInput = React.createRef();
    this.bodyInput = React.createRef();
  }

  componentDidMount() {
    this.fetchAll();
  }

  async fetchAll() {
    const messagesResponse = await fetch('http://localhost:4000/messages');
    const messages = await messagesResponse.json();
    this.setState({ messages });
  }

  async sendEmail() {
    const message = {
      from: this.fromInput.current.value,
      to: this.toInput.current.value,
      subject: this.subjectInput.current.value,
      body: this.bodyInput.current.value,
    };
    console.log(message);
    const postResponse = await fetch('http://localhost:4000/messages', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message),
    });
    const newMessage = await postResponse.json();
    this.setState({
      messages: [...this.state.messages, newMessage],
    });
  }

  async deleteMessage(id) {
    const deleteResponse = await fetch(`http://localhost:4000/messages/${id}`, {
      method: 'DELETE',
    });
    const deletedObject = await deleteResponse.json();
    const oldMessages = this.state.messages;
    const newMessagesArray = oldMessages.filter(m => m.id !== deletedObject.id);
    this.setState({ messages: newMessagesArray });
  }

  async viewMessage(messageId) {
    const getMessageResponse = await fetch(`http://localhost:4000/messages/${messageId}`);
    const wantedObject = await getMessageResponse.json();
    this.setState({ selectedMessage: wantedObject });
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <div>
                  From: <input type="text" ref={this.fromInput} />
                  <br />
        To: <input type="text" ref={this.toInput} />
                  <br />
        Subject: <input type="text" ref={this.subjectInput} />
                  <br />
        Body: <textarea cols="30" rows="12" ref={this.bodyInput}></textarea>
                  <br />
                  <button onClick={() => this.sendEmail()}>Send</button>
                </div>
              </td>
              <td>
                {this.state.selectedMessage &&
                  <div>
                    <h1>Selected message:</h1>
                    <h2>From: {this.state.selectedMessage.from}</h2>
                    <h2>To: {this.state.selectedMessage.to}</h2>
                    <h2>Subject: {this.state.selectedMessage.subject}</h2>
                    <h2>Body: {this.state.selectedMessage.body}</h2>
                  </div>
                }
                {!this.state.selectedMessage && <h1>No message selected yet</h1>}
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <td>From</td>
              <td>Subject</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {this.state.messages.map(message =>
              <tr key={message.id}>
                <td>{message.from}</td>
                <td>{message.subject}</td>
                <td><div>
                  <button onClick={() => this.deleteMessage(message.id)}>Delete</button>
                  <button onClick={() => this.viewMessage(message.id)}>View</button>
                </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default MessagesPage;