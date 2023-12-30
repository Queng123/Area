import 'package:flutter/material.dart';

class BuildTextDashboard {
  Widget buildTextReaction() {
    return Column(
      children: [
        Text(
          'Reaction',
          textAlign: TextAlign.center,
          style: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 24,
            color: Colors.grey.shade800,
          ),
        ),
        const SizedBox(height: 10),
        Text(
          "Select a reaction to create an area",
          textAlign: TextAlign.center,
          style: TextStyle(
            fontSize: 12,
            color: Colors.grey.shade800,
          ),
        ),
      ],
    );
  }

  Widget buildTextAction() {
    return Column(
      children: [
        Text(
          'Action',
          textAlign: TextAlign.center,
          style: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 24,
            color: Colors.grey.shade800,
          ),
        ),
        const SizedBox(height: 10),
        Text(
          "Select an action to create an area",
          textAlign: TextAlign.center,
          style: TextStyle(
            fontSize: 12,
            color: Colors.grey.shade800,
          ),
        ),
      ],
    );
  }
}
