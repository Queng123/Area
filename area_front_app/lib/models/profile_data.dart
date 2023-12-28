import 'package:area_front_app/api/routes/profile/api_username.dart';
import 'package:area_front_app/api/routes/services/api_user_services.dart';

class Profile {
  String username;
  Map<String, bool> serviceStatus;
  Profile({this.username = '', this.serviceStatus = const {}});

  Future<void> loadProfileData() async {
    username = await ApiUsername.getUsername();
    serviceStatus = await ApiUserServices.isServiceConnected();
  }

  static Future<Profile> loadProfile() async {
    Profile profile = Profile();
    await profile.loadProfileData();
    return profile;
  }
}
