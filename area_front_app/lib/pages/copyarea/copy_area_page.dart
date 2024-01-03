import 'package:flutter/material.dart';
import 'package:area_front_app/api/routes/area/api_area.dart';
import 'package:area_front_app/components/copy_area_card.dart';
import 'package:area_front_app/components/fake_user_profile.dart';

class CopyArea extends StatefulWidget {
  const CopyArea({super.key});

  @override
  State<CopyArea> createState() => _CopyAreaState();
}

class _CopyAreaState extends State<CopyArea> {
  List<UserProfile> profiles = [
    UserProfile("Configuration 1", 'lib/images/config2.jpeg', "star", "email"),
    UserProfile("Configuration 2", 'lib/images/config2.jpeg', "star", "email"),
    UserProfile("Configuration 3", 'lib/images/config2.jpeg', "star", "email"),
  ];

  int currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[300],
      body: ListView(
        children: [
          CopyAreaCard(profiles[currentIndex], _askToCopyProfile, _handleSwipe),
        ],
      ),
    );
  }

  void _handleSwipe() {
    setState(() {
      if (currentIndex < profiles.length - 1) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
    });
  }

  void _askToCopyProfile(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text("Copy this configuration ?"),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text("Cancel"),
            ),
            TextButton(
              onPressed: () {
                ApiArea.createArea(profiles[currentIndex].reactionname,
                        profiles[currentIndex].actionname)
                    .then((value) {
                  if (value == 200) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Area Copied'),
                        duration: Duration(seconds: 2),
                      ),
                    );
                    Navigator.pushNamed(context, '/home');
                  } else {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Error while copying area'),
                        duration: Duration(seconds: 2),
                      ),
                    );
                  }
                });
              },
              child: const Text("Copy"),
            ),
          ],
        );
      },
    );
  }
}
