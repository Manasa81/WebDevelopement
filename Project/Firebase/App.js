import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import GloStyles from "./GloStyles";
import { Dimensions } from "react-native";
import ActionSheet from "react-native-actionsheet";
import * as ImageHelper from "./helpers/ImageHelper";
import * as firebase from "firebase/app";
import { firebaseConfig } from "./config/config";
import "firebase/storage";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import * as DocumentPicker from "expo-document-picker";

export default class App extends React.Component {
  constructor() {
    super();
    this.initialiszeFirebase();
  }

  initialiszeFirebase() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  uploadImage = async (image) => {
    const ref = firebase.storage().ref("img/006");

    try {
      const blob = await ImageHelper.prepareBlob(image.uri);
      const snapshot = await ref.put(blob);

      let downloadUrl = await ref.getDownloadURL();

      // await firebase
      //   .database()
      //   .ref("books")
      //   .child(this.state.currentUser.uid)
      //   .child(selectedBook.key)
      //   .update({ image: downloadUrl });

      // blob.close();
      return downloadUrl;
    } catch (error) {
      alert(error);
    }
  };

  openDocuments = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      alert("Sorry, we need camera roll permission to select an image");
      return false;
    } else {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: true,
      });

      console.log(result);
      const ref = firebase.storage().ref(result.name);
      const blob = await ImageHelper.prepareBlob(result.uri);
      const snapshot = await ref.put(blob);
      alert("inserted successfully");
      console.log(result);

      return !result.cancelled ? result : false;
    }
  };

  openLibrary = async () => {
    const result = await ImageHelper.openImageLibrary();

    if (result) {
      const downloadUrl = await this.uploadImage(result);
    } else {
      alert("try again");
    }
  };
  openCamera = async () => {
    const result = await ImageHelper.openCamera();

    if (result) {
      const downloadUrl = await this.uploadImage(result);
    } else {
      console.log("didn't get the result");
    }
  };

  showActionSheet = () => {
    //To show the Bottom ActionSheet
    this.ActionSheet.show();
  };

  render() {
    //Options to show in bottom action sheet. Option Array can be dynamic too
    var optionArray = ["select from photos", "Camera", "Cancel"];
    return (
      <SafeAreaView style={GloStyles.droidSafeArea}>
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button onPress={this.showActionSheet} title="upload" />
          <ActionSheet
            ref={(o) => (this.ActionSheet = o)}
            title={"please upload a picture"}
            options={optionArray}
            cancelButtonIndex={2}
            onPress={(index) => {
              if (index === 1) {
                this.openCamera();
              } else if (index === 0) {
                this.openDocuments();
              }
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}
