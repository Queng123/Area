import 'package:flutter/material.dart';
import 'package:babstrap_settings_screen/babstrap_settings_screen.dart';
import 'package:area_front_app/components/styled_text_field.dart';
import 'package:area_front_app/components/generic_button.dart';
import 'package:area_front_app/models/profile_data.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  final TextEditingController usernameUpdateController =
      TextEditingController();
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

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
      backgroundColor: Colors.grey[300],
      appBar: AppBar(
        backgroundColor: Colors.grey[300],
        title: const Text(
          "Profile",
          style: TextStyle(
            fontWeight: FontWeight.bold,
          ),
        ),
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
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(15),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                SimpleUserCard(
                  userName: "",
                  userProfilePic: NetworkImage(userProfile.profilePic),
                ),
                const SizedBox(height: 20),
                StyledTextField(
                  controller: usernameUpdateController,
                  hintText: 'Username',
                  obscureText: false,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter a valid username';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 300),
                GenericButton(
                  onTap: () {
                    if (_formKey.currentState?.validate() ?? false) {
                      Navigator.pushNamed(context, '/home');
                    }
                  },
                  buttonText: "Save",
                  buttonColor: Colors.black,
                  textColor: Colors.white,
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  padding: 25,
                  margin: 25,
                  borderRadius: 8,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
