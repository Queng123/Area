import 'package:area_front_app/components/bottom_navigation_bar.dart';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:area_front_app/components/generic_button.dart';
import 'dart:io';
import 'package:area_front_app/api/routes/action/api_action.dart';
import 'package:area_front_app/api/routes/reaction/api_reaction.dart';
import 'package:area_front_app/components/build_text_dashboard.dart';
import 'package:area_front_app/api/routes/area/api_area.dart';

class DashBoardPage extends StatefulWidget {
  const DashBoardPage({super.key});

  @override
  State<DashBoardPage> createState() => _DashBoardPageState();
}

class _DashBoardPageState extends State<DashBoardPage> {
  List<Map<String, String>> listActions = [];

  List<Map<String, String>> listReactions = [];

  String actionSelected = '';
  String reactionSelected = '';

  @override
  void initState() {
    super.initState();
    fetchActions();
    fetchReactions();
  }

  Future<void> fetchReactions() async {
    List<Map<String, String>> reactions = await ApiReaction.getReaction();
    setState(() {
      listReactions = reactions;
    });

    if (listReactions.isEmpty) {
      setState(() {
        listReactions = [
          {
            'name': 'NOT CONNECTED',
            'description': 'NOT CONNECTED TO ANY PROVIDER',
          },
        ];
      });
    }
    reactionSelected = listReactions[0]['name']!;
  }

  Future<void> fetchActions() async {
    List<Map<String, String>> actions = await ApiAction.getActions();
    setState(() {
      listActions = actions;
    });
    if (listActions.isEmpty) {
      setState(() {
        listActions = [
          {
            'name': 'NOT CONNECTED',
            'description': 'NOT CONNECTED TO ANY PROVIDER',
          },
        ];
      });
    }
    actionSelected = listActions[0]['name']!;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'DashBoard',
          style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
        ),
        backgroundColor: Colors.grey[300],
        centerTitle: true,
        automaticallyImplyLeading: false,
      ),
      backgroundColor: Colors.grey[300],
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: 50),
          BuildTextDashboard().buildTextAction(),
          _buildDivider(),
          const SizedBox(height: 20),
          _buildMiniDashBoard('Action', actionSelected, (value) {
            setState(() {
              actionSelected = value;
            });
          }, listActions),
          const SizedBox(height: 50),
          BuildTextDashboard().buildTextReaction(),
          _buildDivider(),
          const SizedBox(height: 20),
          _buildMiniDashBoard('Reaction', reactionSelected, (value) {
            setState(() {
              reactionSelected = value;
            });
          }, listReactions),
          SizedBox(
            height: Platform.isIOS ? 118 : 60.0,
          ),
          GenericButton(
            onTap: _onAreaCreateButtonPressed,
            buttonText: "Create Area",
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
      bottomNavigationBar: const CustomBottomNavigationBar(),
    );
  }

  Widget _buildPicker(String title, List<Map<String, String>> items,
      Function(String) onChanged) {
    return Theme(
      data: ThemeData(
        cupertinoOverrideTheme: const CupertinoThemeData(
          brightness: Brightness.dark,
        ),
      ),
      child: Platform.isIOS
          ? _buildCupertinoPicker(items, title: title)
          : _buildDropdownButton(items, title: title),
    );
  }

  Widget _buildCupertinoPicker(List<Map<String, String>> items,
      {String? title}) {
    return SizedBox(
      height: 100,
      child: CupertinoPicker(
        itemExtent: 40,
        onSelectedItemChanged: (index) {
          setState(() {
            if (title == 'Action') {
              actionSelected = items[index]['name']!;
            } else {
              reactionSelected = items[index]['name']!;
            }
          });
        },
        children: items.map((item) {
          return GestureDetector(
            onLongPress: () {
              _showDescription(item['description']!);
            },
            child: Center(
              child: Text(
                item['name']!,
                style: const TextStyle(
                  fontSize: 24,
                  color: Colors.black,
                ),
              ),
            ),
          );
        }).toList(),
      ),
    );
  }

  void _showDescription(String item) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('DESCRIPTION: $item', textAlign: TextAlign.center),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  Widget _buildDropdownButton(List<Map<String, String>> items,
      {String? title}) {
    return DropdownButton<String>(
      value: title == 'Action' ? actionSelected : reactionSelected,
      icon: const Icon(Icons.arrow_downward),
      iconSize: 24,
      elevation: 16,
      style: const TextStyle(color: Colors.black),
      underline: Container(
        height: 2,
        color: Colors.black,
      ),
      onChanged: (String? newValue) {
        setState(() {
          if (title == 'Action') {
            actionSelected = newValue!;
          } else {
            reactionSelected = newValue!;
          }
        });
      },
      items: items.map<DropdownMenuItem<String>>((Map<String, String> item) {
        return DropdownMenuItem<String>(
          value: item['name'],
          child: Text(item['name']!),
        );
      }).toList(),
    );
  }

  Widget _buildDivider() {
    return const Padding(
      padding: EdgeInsets.symmetric(horizontal: 40.0),
      child: Divider(
        thickness: 1,
        color: Color.fromRGBO(66, 66, 66, 1),
      ),
    );
  }

  Widget _buildMiniDashBoard(String title, String selectedValue,
      Function(String) onChanged, List<Map<String, String>> items) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 40.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          SizedBox(
            height: Platform.isIOS ? 100 : 60.0,
            child: _buildPicker(title, items, onChanged),
          ),
        ],
      ),
    );
  }

  void _onAreaCreateButtonPressed() {
    ApiArea.createArea(actionSelected, reactionSelected).then((value) {
      if (value == 201) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Area created : $actionSelected-$reactionSelected',
                textAlign: TextAlign.center),
            duration: const Duration(seconds: 2),
          ),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Area not created', textAlign: TextAlign.center),
            duration: Duration(seconds: 2),
          ),
        );
      }
    });
  }
}
