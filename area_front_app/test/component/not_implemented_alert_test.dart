import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:area_front_app/components/not_implemented_alert.dart';

void main() {
  testWidgets('NotImplementedAlert should show dialog with title and content', (WidgetTester tester) async {
    await tester.pumpWidget(
      MaterialApp(
        home: Builder(
          builder: (BuildContext context) {
            return ElevatedButton(
              onPressed: () {
                NotImplementedAlert.show(context, 'Test Title', 'Test Content');
              },
              child: const Text('Show Alert'),
            );
          },
        ),
      ),
    );

    await tester.tap(find.text('Show Alert'));
    await tester.pump();

    expect(find.text('Test Title'), findsOneWidget);
    expect(find.text('Test Content'), findsOneWidget);
    expect(find.text('OK'), findsOneWidget);
  });
}
