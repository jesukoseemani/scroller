loadMe();

function loadMe(){
const xhr = new XMLHttpRequest();
xhr.open('GET','data.json',true);

xhr.onload= function(){
if(this.status === 200){
  const data = JSON.parse(this.responseText);

  const profiles = profileIterator(data);
    //Creating event listener
    document.getElementById('next').addEventListener('click', nextProfile.bind(null, profiles));
    
    nextProfile(profiles);
}

}
xhr.send();

}

function nextProfile(profiles) {
  //Getting Iteration next value
  const currentProfile = profiles.next().value;
 
  if (currentProfile !== undefined) {
    //Targeting the profile div and inputing the UI data
    document.getElementById('profileDisplay').innerHTML = `
        <ul class="list-group">
          <li class="list-group-item">Name: ${currentProfile.name}</li>
          <li class="list-group-item">age: ${currentProfile.age}</li>
          <li class="list-group-item">Gender: ${currentProfile.gender}</li>
          <li class="list-group-item">lookingfor: ${currentProfile.lookingfor}</li>
          <li class="list-group-item">Location: ${currentProfile.location}</li>
        </ul>
      `;
      document.getElementById('imageDisplay').innerHTML = 
`
<img src="${currentProfile.image}" alt="image">
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