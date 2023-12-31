import 'package:area_front_app/components/dialogs/custom_dialog.dart';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:babstrap_settings_screen/babstrap_settings_screen.dart';
import 'package:area_front_app/models/profile_data.dart';

class SettingPage extends StatefulWidget {
  const SettingPage({super.key});

  @override
  State<SettingPage> createState() => _SettingPageState();
}

class _SettingPageState extends State<SettingPage> {
  bool _isSwitched = true;
  late Profile userProfile = Profile(
    username: "Loading...",
    profilePic:
        "https://i.pinimg.com/564x/8b/6e/c6/8b6ec60427f9b17c1d9aaf4c415babe3.jpg",
  );
  @override
  void initState() {
    super.initState();
    _loadProfileData();
  }

  Future<void> _loadProfileData() async {
    userProfile = await Profile.loadProfile();
    if (mounted) {
      setState(() {});
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white.withOpacity(.94),
      appBar: AppBar(
        title: const Text(
          "Settings",
          style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
        ),
        centerTitle: true,
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          onPressed: () {
            Navigator.pushNamed(context, '/home');
          },
          icon: const Icon(
            Icons.arrow_back_ios_rounded,
            color: Colors.black,
          ),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(10),
        child: ListView(
          children: [
            const SizedBox(height: 20),
            BigUserCard(
              backgroundColor: Colors.purple[300],
              userName: userProfile.username,
              userProfilePic: NetworkImage(userProfile.profilePic),
              cardActionWidget: SettingsItem(
                icons: Icons.edit,
                iconStyle: IconStyle(
                  withBackground: true,
                  backgroundColor: Colors.purple[600],
                ),
                title: "Account",
                subtitle: "Modify your profile",
                onTap: () {
                  Navigator.pushNamed(context, '/profile');
                },
              ),
            ),
            SettingsGroup(
              settingsGroupTitle: "General",
              items: [
                SettingsItem(
                  onTap: () {},
                  icons: Icons.notifications,
                  iconStyle: IconStyle(
                    iconsColor: Colors.white,
                    withBackground: true,
                    backgroundColor: Colors.red,
                  ),
                  title: 'Notifications',
                  subtitle: "Manage notifications",
                  trailing: Switch.adaptive(
                    value: _isSwitched,
                    onChanged: (value) {
                      setState(() {
                        _isSwitched = value;
                      });
                    },
                  ),
                ),
              ],
            ),
            SettingsGroup(
              settingsGroupTitle: "About",
              items: [
                SettingsItem(
                  onTap: () {
                    Navigator.pushNamed(context, '/aboutus');
                  },
                  icons: Icons.info_rounded,
                  iconStyle: IconStyle(
                    backgroundColor: Colors.purple[600],
                  ),
                  title: 'About us',
                  subtitle: "Learn more about Area",
                ),
              ],
            ),
            SettingsGroup(
              settingsGroupTitle: "Account",
              items: [
                SettingsItem(
                  onTap: () {
                    CustomDialog.dialogSignOut(context);
                  },
                  icons: Icons.exit_to_app_rounded,
                  title: "Sign Out",
                ),
              ],
            ),
            SettingsGroup(
              items: [
                SettingsItem(
                  onTap: () {
                    CustomDialog.dialogDeleteAccount(context);
                  },
                  icons: CupertinoIcons.delete,
                  iconStyle: IconStyle(
                    backgroundColor: Colors.red,
                  ),
                  title: "Delete account",
                  titleStyle: const TextStyle(
                    color: Colors.red,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
