import React, {useState} from "react";

function BasicForm(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const handleEmailChange = event => {
    setEmail(event.target.value)
  };
  const handlePasswordChange = event => {
    setPassword(event.target.value)
  };

  const handleSubmit = event => {
    event.preventDefault();
    alert(`Your state values: \n 
            email: ${email} \n 
            password: ${password} \n
            You can replace this alert with your process`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email address</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleEmailChange}
          value={email}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handlePasswordChange}
          value={password}
        />
      </div>
      <button type="submit">
        Submit
      </button>
    </form>
  )
}

export default BasicForm