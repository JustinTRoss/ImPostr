

Redux front end things to do

postQueueActions
  remove from queue
  insert from queue


PlatformListActions (add)
  PlatformListEntryAction
    Login
    Logout
    ToggleAutopilot
    ToggleSettingsModal
    UpdateSettingsFields
  
App State
  PlatformList: [{PlatfromListEntry}],
  PostQueue: [{PostObject}]
  UserLoggedIn: {UserObject}

PlatformListEntry: {
  platformName: ‘FB’, (String),
  userPlatformLoggedIn: true,
  showModal: false,
  settings: {
    autoPilot: true, (Boolean),
    interests: [‘football’], (Array of strings),
    postFrequency: .85, (number)
  } (Object)
}
  
PostObject: {
  platformName: ‘FB’ (String),
  message: ‘yolo’, (String),
  dateToPost: {}, (JS Date Object)
}

UserObject: {
  userID: ,
  username: , (String)
  password: , (String)
  loggedIn: , (Boolean) 
}


//Client component design
