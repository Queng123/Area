import 'package:area_front_app/api/routes/services/api_user_services.dart';
import 'package:flutter/material.dart';
import 'package:area_front_app/components/oauth2_service_box.dart';
import 'package:area_front_app/models/profile_data.dart';
import 'package:area_front_app/api/routes/auth/oauth2/api_auth_github.dart';

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
    ["Github", "lib/images/github.png"],
    ["Google", "lib/images/google.png"],
    ["Discord", "lib/images/google.png"],
    ["Steam", "lib/images/google.png"],
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
      userProfile.serviceStatus[myOAuth2Services[index][0]] = value;
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
      powerOn: userProfile.serviceStatus[myOAuth2Services[index][0]] ?? false,
      onChanged: (value) {
        userProfile.serviceStatus[myOAuth2Services[index][0]] = value;
        if (value) {
          showDialog(
            context: context,
            builder: (context) => AlertDialog(
              title: const Text('Connect service'),
              content: const Text(
                'You are about to connect this service.',
                textAlign: TextAlign.center,
              ),
              actions: [
                TextButton(
                  onPressed: () {
                    Navigator.of(context).pop();
                    if (myOAuth2Services[index][0] == "Github") {
                      ApiGitHub().authenticateWithGitHub();
                      powerSwitchChanged(true, index);
                    }
                  },
                  child: const Text('Connect'),
                ),
                TextButton(
                  onPressed: () {
                    Navigator.of(context).pop();
                    userProfile.serviceStatus[myOAuth2Services[index][0]] =
                        false;
                  },
                  child: const Text('Cancel'),
                ),
              ],
            ),
          );
        } else {
          showDialog(
            context: context,
            builder: (context) => AlertDialog(
              title: const Text('Disconnect service'),
              content: const Text('You are about to disconnect this service.'),
              actions: [
                TextButton(
                  onPressed: () {
                    Navigator.of(context).pop();
                    ApiUserServices.deleteService(myOAuth2Services[index][0])
                        .then((value) {
                      if (value == 200) {
                        powerSwitchChanged(false, index);
                      }
                    });
                  },
                  child: const Text('Disconnect'),
                ),
                TextButton(
                  onPressed: () {
                    Navigator.of(context).pop();
                    userProfile.serviceStatus[myOAuth2Services[index][0]] =
                        true;
                  },
                  child: const Text('Cancel'),
                ),
              ],
            ),
          );
        }
      },
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
