const permissionToBolean = (receivePermission) => {

    switch (receivePermission){
        case "true":
            return true
        case "false":
            return false
        default:
            break;
    }

}

export default permissionToBolean;