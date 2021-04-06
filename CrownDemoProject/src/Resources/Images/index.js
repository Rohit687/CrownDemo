const resources = {
    "splash": require('./splash.jpg'),
    "placeholder": require('./placeholder.jpg')
}

export function getAssetByFilename(filename) {
    if (resources.hasOwnProperty(filename)) {
        return resources[filename];
    }
    return null;
}

export const ImageSource = {
    splash: 'splash',
    placeholder: 'placeholder'
}