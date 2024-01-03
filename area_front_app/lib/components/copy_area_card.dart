import 'package:flutter/material.dart';
import 'package:area_front_app/components/fake_user_profile.dart';

class CopyAreaCard extends StatelessWidget {
  final UserProfile profile;
  final Function(BuildContext) askToCopyProfile;
  final Function() handleSwipe;

  const CopyAreaCard(this.profile, this.askToCopyProfile, this.handleSwipe,
      {super.key});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        askToCopyProfile(context);
      },
      child: Dismissible(
        key: Key(profile.username),
        direction: DismissDirection.horizontal,
        onDismissed: (DismissDirection direction) {
          if (direction == DismissDirection.startToEnd ||
              direction == DismissDirection.endToStart) {
            handleSwipe();
          }
        },
        background: Container(
          color: Colors.grey[300],
        ),
        secondaryBackground: Container(
          color: Colors.grey[300],
        ),
        child: Container(
          margin: const EdgeInsets.all(16.0),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(10.0),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(1),
                spreadRadius: 4,
                blurRadius: 7,
                offset: const Offset(0, 0),
              ),
            ],
          ),
          child: Column(
            children: [
              SizedBox(
                height: MediaQuery.of(context).size.height * 0.39,
                width: double.infinity,
                child: Column(
                  children: [
                    SizedBox(
                      height: MediaQuery.of(context).size.height * 0.10,
                      width: double.infinity,
                      child: ClipRRect(
                        borderRadius: const BorderRadius.only(
                          topLeft: Radius.circular(10.0),
                          topRight: Radius.circular(10.0),
                        ),
                        child: Image.asset(
                          profile.imagePath,
                          fit: BoxFit.cover,
                        ),
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.all(8.0),
                      height: MediaQuery.of(context).size.height * 0.20,
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          Text(
                            profile.username,
                            style: const TextStyle(
                              fontSize: 24.0,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 5.0),
                          const Text(
                            "List of Areas",
                            style: TextStyle(
                              fontSize: 16.0,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                          const SizedBox(height: 10.0),
                          Text(
                            "${profile.actionname} - ${profile.reactionname}",
                            style: const TextStyle(
                              fontSize: 16.0,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ],
                      ),
                    ),
                    SizedBox(
                      height: MediaQuery.of(context).size.height * 0.09,
                      width: double.infinity,
                      child: ClipRRect(
                        borderRadius: const BorderRadius.only(
                          bottomLeft: Radius.circular(10.0),
                          bottomRight: Radius.circular(10.0),
                        ),
                        child: Image.asset(
                          profile.imagePath,
                          fit: BoxFit.cover,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
