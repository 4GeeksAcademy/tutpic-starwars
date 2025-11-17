export const initialStore = () => {
  return {
    peopleList: {
      list: [{ uid: 1, name: "locoloco", link: "www.google.com" }],
      nextUrl: "",
      prevUrl: ""
    },
    planetsList: {
      list: [{ uid: 1, name: "locoloco", link: "www.google.com" }],
      nextUrl: "",
      prevUrl: ""
    },
    vehiclesList: {
      list: [{ uid: 1, name: "locoloco", link: "www.google.com" }],
      nextUrl: "",
      prevUrl: ""
    },
    favorites: []
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set-people-list':
      var { results, previous, next } = action.payload
      return {
        ...store,
        peopleList: {
          list: results,
          nextUrl: next,
          prevUrl: previous
        }
      };
      case 'set-planets-list':
      var { results, previous, next } = action.payload
      return {
        ...store,
        planetsList: {
          list: results,
          nextUrl: next,
          prevUrl: previous
        }
      };
      case 'set-vehicles-list':
      var { results, previous, next } = action.payload
      return {
        ...store,
        vehiclesList: {
          list: results,
          nextUrl: next,
          prevUrl: previous
        }
      };
    case "add-favorite":
      let newFav = { uid: action.payload.uid, name: action.payload.name, subj: action.payload.subj }
      let addFav = [...store.favorites, newFav]
      return {
        ...store,
        favorites: addFav
      }
    case "delete-fav":
      let delList = store.favorites.filter((ele) =>{
        if(ele.subj == action.payload.subj){
          return ele.uid != action.payload.uid
        }
        else{
          return true
        }
      })
      return {
        ...store,
        favorites: delList
      }

    default:
      throw Error('Unknown action.');
  }
}
