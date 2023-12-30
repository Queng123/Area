import 'package:flutter/material.dart';
import 'package:area_front_app/api/routes/area/api_area.dart';

class MiniDashBoard extends StatelessWidget {
  final List<Map<String, String>> listAreas;
  final void Function()? onTap;

  const MiniDashBoard({
    super.key,
    required this.listAreas,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    double screenHeight = MediaQuery.of(context).size.height;
    double containerWidth = screenWidth * 0.88;
    double containerHeight = screenHeight * 0.45;

    return GestureDetector(
      onTap: onTap,
      child: Center(
        child: Padding(
          padding: const EdgeInsets.all(15.0),
          child: Container(
            width: containerWidth,
            height: containerHeight,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(10),
              color: Colors.grey[900],
            ),
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 25.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        const Text(
                          'List of Areas',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 18,
                            color: Colors.white,
                          ),
                        ),
                        const SizedBox(height: 5),
                        Center(
                          child: ListView.builder(
                            shrinkWrap: true,
                            itemCount: listAreas.length,
                            itemBuilder: (context, index) {
                              Map<String, String> area = listAreas[index];
                              return Dismissible(
                                confirmDismiss: (direction) async {
                                  return await showDialog(
                                    context: context,
                                    builder: (BuildContext context) {
                                      return AlertDialog(
                                        title: const Text('Confirm'),
                                        content: const Text(
                                            'Are you sure you wish to delete this area?'),
                                        actions: <Widget>[
                                          TextButton(
                                            onPressed: () {
                                              ApiArea.deleteArea(
                                                  area['action_id']!,
                                                  area['reaction_id']!).then((value) {
                                                if (value == 200) {
                                                  Navigator.of(context)
                                                      .pop(true);
                                                }
                                                  });
                                            },
                                            child: const Text('Delete'),
                                          ),
                                          TextButton(
                                            onPressed: () =>
                                                Navigator.of(context)
                                                    .pop(false),
                                            child: const Text('Cancel'),
                                          ),
                                        ],
                                      );
                                    },
                                  );
                                },
                                key: Key(area['action_id']!),
                                onDismissed: (direction) {
                                  listAreas.removeAt(index);
                                },
                                background: Container(
                                  color: Colors.red,
                                  child: const Icon(Icons.delete,
                                      color: Colors.white),
                                ),
                                child: ListTile(
                                  title: Text(
                                    '${area['action_id']} - ${area['reaction_id']}',
                                    textAlign: TextAlign.center,
                                    style: const TextStyle(
                                      fontSize: 16,
                                      color: Colors.white,
                                    ),
                                  ),
                                ),
                              );
                            },
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
