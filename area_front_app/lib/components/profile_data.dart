import 'package:area_front_app/api/routes/profile/api_username.dart';

class Profile {
  String username;
  Profile({this.username = ''});

  Future<void> loadProfileData() async {
    username = await ApiUsername.getUsername();
  }

  static Future<Profile> loadProfile() async {
    Profile profile = Profile();
    await profile.loadProfileData();
    return profile;
  }
}
