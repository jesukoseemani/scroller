class Data {
 
  async getData(url) {
    const response = await fetch(url);
 
    const resData = await response.json();
 
    return resData
 
  }
}
 
//Init Data
const data = new Data();
 
data.getData('https://jsonplaceholder.typicode.com/users')
  .then(data => {
    const profiles = profileIterator(data);
    //Creating event listener
    document.getElementById('next').addEventListener('click', nextProfile.bind(null, profiles));
    
    nextProfile(profiles);
  })
 
 
function nextProfile(profiles) {
  //Getting Iteration next value
  const currentProfile = profiles.next().value;
 
  if (currentProfile !== undefined) {
    //Targeting the profile div and inputing the UI data
    document.getElementById('profileDisplay').innerHTML = `
        <ul class="list-group">
          <li class="list-group-item">Name: ${currentProfile.name}</li>
          <li class="list-group-item">Username: ${currentProfile.username}</li>
          <li class="list-group-item">Email: ${currentProfile.email}</li>
          <li class="list-group-item">Company: ${currentProfile.company.name}</li>
        </ul>
      `;
  } else {
    // No more profiles
    window.location.reload();
  }
}
 
 
//Iteration function
function profileIterator(profiles) {
  let nextIndex = 0;
 
  return {
    next: function () {
      if (nextIndex < profiles.length) {
        return { value: profiles[nextIndex++], done: false };
      } else {
        return { done: true };
      }
    }
  };
}


// bind in this example is used to pass parameter profiles to nextProfile function, and first parameter in bind is always the element which will be used as this keyword in a function, but we don't need this in nextProfile function so it can be null.

// But if you would do something like this: document.getElementById('next').addEventListener('click', nextProfile) this keyword will refer to the document, so you can pass document in bind if you want to, like this:

// document.getElementById('next').addEventListener('click', nextProfile.bind(document, profiles));
// Since you cannot do this: document.getElementById('next').addEventListener('click', nextProfile(profiles));

// because in this case you will call the nextProfile function immediately and it will not work when button is clicked, that's why I have used bind method.

// Please check this links for more info:

// addEventListener

// bind