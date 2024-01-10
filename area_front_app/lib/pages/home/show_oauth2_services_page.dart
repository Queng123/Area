import 'package:area_front_app/api/routes/services/api_user_services.dart';
import 'package:flutter/material.dart';
import 'package:area_front_app/components/oauth2_service_box.dart';
import 'package:area_front_app/models/profile_data.dart';
import 'package:area_front_app/api/routes/auth/oauth2/api_auth_github.dart';
import 'package:area_front_app/components/mini_dashboard.dart';
import 'package:area_front_app/pages/copyarea/copy_area_page.dart';
import 'package:area_front_app/api/routes/auth/oauth2/api_auth_google.dart';
import 'package:area_front_app/api/routes/auth/oauth2/api_auth_spotify.dart';
import 'package:area_front_app/api/routes/auth/oauth2/api_auth_deezer.dart';
import 'package:area_front_app/api/routes/auth/oauth2/api_auth_discord.dart';
import 'dart:async';

class OAuth2ServicesPage extends StatefulWidget {
  const OAuth2ServicesPage({super.key});

  @override
  State<OAuth2ServicesPage> createState() => _OAuth2ServicesPageState();
}

class _OAuth2ServicesPageState extends State<OAuth2ServicesPage> {
  static const String welcomeText = "Welcome,";
  late Profile userProfile = Profile(
    username: "Loading...",
    profilePic:
        'https://i.pinimg.com/564x/8b/6e/c6/8b6ec60427f9b17c1d9aaf4c415babe3.jpg',
    listAreas: [
      {
        'action_id': 'Loading...',
        'reaction_id': 'Loading...',
      },
    ],
  );
  static const String oAuth2ConnectText = "OAuth2 Connect";
  static const String areaText = "Area";

  final double horizontalPadding = 40;
  final double verticalPadding = 25;

  bool isShowOAuth2Services = false;
  bool isShowMiniDash = true;
  bool isShowCopyArea = false;
  bool isArrowUp = false;

  List myOAuth2Services = [
    ["Github", "lib/images/github.png"],
    ["Discord", "lib/images/discord.png"],
    ["Google", "lib/images/google.png"],
    ["Spotify", "lib/images/spotify.png"],
    ["Deezer", "lib/images/deezer.png"],
  ];

  final ScrollController _scrollController = ScrollController();

  @override
  void initState() {
    super.initState();
    _loadProfileData();

    if (userProfile.isConnect) {
      Timer.periodic(const Duration(seconds: 3), (Timer timer) {
        _reloadProfileData();
      });
    }
  }

  Future<void> _loadProfileData() async {
    userProfile = await Profile.loadProfile();
    if (mounted) {
      setState(() {});
    }
  }

  Future<void> _reloadProfileData() async {
    userProfile.serviceStatus = await ApiUserServices.isServiceConnected();
    if (mounted) {
      setState(() {});
    }
  }

  void powerSwitchChanged(bool value, int index) {
    setState(() {
      userProfile.serviceStatus[myOAuth2Services[index][0]] = value;
    });
  }

  int showAuthServices() {
    int count = 0;
    for (var service in userProfile.serviceStatus.entries) {
      if (service.value) {
        count++;
      }
    }
    return count;
  }

  ListView buildOAuth2ServicesList() {
    return ListView.builder(
      controller: _scrollController,
      itemCount: (myOAuth2Services.length / 2).ceil() +
          (myOAuth2Services.length > 4 ? 1 : 0),
      padding: const EdgeInsets.symmetric(horizontal: 25),
      itemBuilder: (context, index) {
        if (myOAuth2Services.length > 4 &&
            index == (myOAuth2Services.length / 2).ceil() - 1) {
          return GestureDetector(
            onTap: () {
              if (isArrowUp == false) {
                _scrollController.animateTo(
                  _scrollController.position.maxScrollExtent,
                  duration: const Duration(milliseconds: 500),
                  curve: Curves.fastOutSlowIn,
                );
              } else {
                _scrollController.animateTo(
                  _scrollController.position.minScrollExtent,
                  duration: const Duration(milliseconds: 500),
                  curve: Curves.fastOutSlowIn,
                );
              }
              setState(() {
                isArrowUp = !isArrowUp;
              });
            },
            child: Center(
              child: Icon(
                isArrowUp ? Icons.keyboard_arrow_up : Icons.keyboard_arrow_down,
                size: 36,
                color: Colors.black,
              ),
            ),
          );
        }

        int startIndex = index * 2;
        int endIndex = startIndex + 2;
        startIndex = startIndex.clamp(0, myOAuth2Services.length - 1);
        endIndex = endIndex.clamp(0, myOAuth2Services.length);

        return Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: List.generate(endIndex - startIndex, (i) {
            return Expanded(
              child: buildOAuth2ServiceBox(startIndex + i),
            );
          }),
        );
      },
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
                  onPressed: () async {
                    Navigator.of(context).pop();
                    final serviceName = myOAuth2Services[index][0];

                    switch (serviceName) {
                      case "Github":
                        await ApiGitHub().authenticateWithGitHub();
                      case "Google":
                        await ApiGoogle().authenticateWithGoogle();
                      case "Spotify":
                        await ApiSpotify().authenticateWithSpotify();
                      case "Deezer":
                        await ApiDeezer().authenticateWithDeezer();
                      case "Discord":
                        await ApiDiscord().authenticateWithDiscord();
                      default:
                        break;
                    }
                    powerSwitchChanged(true, index);
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
                  InkWell(
                    onTap: () {
                      Navigator.pushNamed(context, '/profile');
                    },
                    child: CircleAvatar(
                      backgroundColor: Colors.grey.shade800,
                      radius: 17.5,
                      child: ClipOval(
                        child: Image.network(
                          userProfile.profilePic,
                          width: 35,
                          height: 35,
                          fit: BoxFit.cover,
                        ),
                      ),
                    ),
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
                        isShowMiniDash = false;
                        isShowCopyArea = false;
                        isArrowUp = false;
                      });
                    },
                  ),
                ],
              ),
            ),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: horizontalPadding),
              child: Text(
                "You have ${showAuthServices()}/5 services connected",
                style: TextStyle(
                  fontSize: 11,
                  color: Colors.grey.shade800,
                ),
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
            if (isShowOAuth2Services)
              Expanded(child: buildOAuth2ServicesList()),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: horizontalPadding),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text(
                    areaText,
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 24,
                      color: Colors.grey.shade800,
                    ),
                  ),
                  IconButton(
                    icon: isShowMiniDash
                        ? const Icon(Icons.remove)
                        : const Icon(Icons.add),
                    onPressed: () {
                      setState(() {
                        isShowMiniDash = !isShowMiniDash;
                        isShowOAuth2Services = false;
                        isShowCopyArea = false;
                        isArrowUp = false;
                      });
                    },
                  ),
                ],
              ),
            ),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: horizontalPadding),
              child: Text(
                "Manage your Area",
                style: TextStyle(
                  fontSize: 11,
                  color: Colors.grey.shade800,
                ),
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
            if (isShowMiniDash)
              Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 8,
                  vertical: 8,
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    MiniDashBoard(
                      listAreas: userProfile.listAreas,
                      onTap: () {
                        Navigator.pushNamed(context, '/dashboard');
                      },
                    ),
                  ],
                ),
              ),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: horizontalPadding),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text(
                    "Copy Area",
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 24,
                      color: Colors.grey.shade800,
                    ),
                  ),
                  IconButton(
                    icon: isShowCopyArea
                        ? const Icon(Icons.remove)
                        : const Icon(Icons.add),
                    onPressed: () {
                      setState(() {
                        isShowCopyArea = !isShowCopyArea;
                        isShowOAuth2Services = false;
                        isShowMiniDash = false;
                        isArrowUp = false;
                      });
                    },
                  ),
                ],
              ),
            ),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: horizontalPadding),
              child: Text(
                "Copy an Area from another configuration",
                style: TextStyle(
                  fontSize: 11,
                  color: Colors.grey.shade800,
                ),
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
            if (isShowCopyArea)
              SizedBox(
                height: MediaQuery.of(context).size.height * 0.43,
                child: const CopyArea(),
              ),
          ],
        ),
      ),
    );
  }
}
