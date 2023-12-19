import 'package:flutter/material.dart';
import 'package:area_front_app/components/oauth2_service_box.dart';
import 'package:area_front_app/components/profile_data.dart';

class OAuth2ServicesPage extends StatefulWidget {
  const OAuth2ServicesPage({super.key});

  @override
  State<OAuth2ServicesPage> createState() => _OAuth2ServicesPageState();
}

class _OAuth2ServicesPageState extends State<OAuth2ServicesPage> {
  static const String welcomeText = "Welcome,";
  late Profile userProfile = Profile(
    username: "Loading...",
  );
  static const String oAuth2ConnectText = "OAuth2 Connect";

  final double horizontalPadding = 40;
  final double verticalPadding = 25;

  bool isShowOAuth2Services = false;

  List myOAuth2Services = [
    ["GitHub", "lib/images/github.png", true],
    ["Google", "lib/images/google.png", false],
    ["Spotify", "lib/images/google.png", true],
    ["Twitch", "lib/images/google.png", false],
  ];

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

  void powerSwitchChanged(bool value, int index) {
    setState(() {
      myOAuth2Services[index][2] = value;
    });
  }

  Expanded buildOAuth2ServicesGrid() {
    return Expanded(
      child: GridView.builder(
        itemCount: myOAuth2Services.length,
        physics: const NeverScrollableScrollPhysics(),
        padding: const EdgeInsets.symmetric(horizontal: 25),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          childAspectRatio: 1 / 1.3,
        ),
        itemBuilder: (context, index) {
          return buildOAuth2ServiceBox(index);
        },
      ),
    );
  }

  OAuth2ServiceBox buildOAuth2ServiceBox(int index) {
    return OAuth2ServiceBox(
      oauth2Name: myOAuth2Services[index][0],
      iconPath: myOAuth2Services[index][1],
      powerOn: myOAuth2Services[index][2],
      onChanged: (value) => powerSwitchChanged(value, index),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[300],
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 20),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: horizontalPadding),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text(
                    welcomeText,
                    style: TextStyle(fontSize: 20, color: Colors.grey.shade800),
                  ),
                  const SizedBox(width: 10),
                  Text(
                    "@${userProfile.username}",
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Colors.grey.shade800,
                    ),
                  ),
                  const Spacer(),
                  Icon(
                    Icons.circle,
                    color: Colors.grey.shade800,
                    size: 35,
                  )
                ],
              ),
            ),
            const SizedBox(height: 10),
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 40.0),
              child: Divider(
                thickness: 1,
                color: Color.fromRGBO(66, 66, 66, 1),
              ),
            ),
            const SizedBox(height: 20),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: horizontalPadding),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text(
                    oAuth2ConnectText,
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 24,
                      color: Colors.grey.shade800,
                    ),
                  ),
                  IconButton(
                    icon: isShowOAuth2Services
                        ? const Icon(Icons.remove)
                        : const Icon(Icons.add),
                    onPressed: () {
                      setState(() {
                        isShowOAuth2Services = !isShowOAuth2Services;
                      });
                    },
                  ),
                ],
              ),
            ),
            const SizedBox(height: 10),
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 40.0),
              child: Divider(
                thickness: 1,
                color: Color.fromRGBO(66, 66, 66, 1),
              ),
            ),
            if (isShowOAuth2Services) buildOAuth2ServicesGrid(),
          ],
        ),
      ),
    );
  }
}
