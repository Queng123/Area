import 'package:area_front_app/api/routes/profile/api_username.dart';
import 'package:area_front_app/api/routes/services/api_user_services.dart';
import 'package:area_front_app/api/routes/area/api_area.dart';

class Profile {
  String username;
  String profilePic;
  Map<String, bool> serviceStatus;
  List<Map<String, String>> listAreas = [];
  Profile(
      {this.username = '',
      this.serviceStatus = const {},
      this.listAreas = const [],
      this.profilePic = 'https://i.pinimg.com/564x/8b/6e/c6/8b6ec60427f9b17c1d9aaf4c415babe3.jpg'}
      );

  Future<void> loadProfileData() async {
    username = await ApiUsername.getUsername();
    serviceStatus = await ApiUserServices.isServiceConnected();
    listAreas = await ApiArea.getArea();
  }

  static Future<Profile> loadProfile() async {
    Profile profile = Profile();
    await profile.loadProfileData();
    return profile;
  }
}
