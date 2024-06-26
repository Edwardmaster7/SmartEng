import React, { useState } from 'react';
import { View, Image, Button } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const ProfilePicture = () => {
  const [profilePic, setProfilePic] = useState(null);

  const handleProfilePicture = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      setProfilePic(`data:${image.mime};base64,${image.data}`);
      // You can upload the base64 data to your server here
    });
  };

  return (
    <View>
      {profilePic ? (
        <Image source={{ uri: profilePic }} style={{ width: 200, height: 200 }} />
      ) : (
        <Button title="Select Profile Picture" onPress={handleProfilePicture} />
      )}
    </View>
  );
};

export default ProfilePicture;