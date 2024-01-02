import 'package:flutter/material.dart';

class OnboardingPage extends StatelessWidget {
  const OnboardingPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: OnboardingPagePresenter(pages: [
        OnboardingPageModel(
          title: "Welcome to Area",
          description:
              "Area is a service that allows you to create your own services by combining existing services.",
          imageUrl:
              "lib/images/logo.png",
        ),
        OnboardingPageModel(
          title: "You can connect to many services",
          description:
              "Area allows you to connect to many services such as Twitter, Spotify, Gmail, Github etc.",
          imageUrl:
              "lib/images/logo.png",
        ),
        OnboardingPageModel(
          title: "You can create your own area",
          description:
              "Area allows you to create your own services by combining existing services.",
          imageUrl:
              "lib/images/logo.png",
        ),
        OnboardingPageModel(
          title: "You can use your own area",
          description:
              "Area allows you to use your own services by combining existing services.",
          imageUrl:
              "lib/images/logo.png",
        )
      ]),
    );
  }
}

class OnboardingPagePresenter extends StatefulWidget {
  final List<OnboardingPageModel> pages;
  final VoidCallback? onSkip;
  final VoidCallback? onFinish;

  const OnboardingPagePresenter({
    super.key,
    required this.pages,
    this.onSkip,
    this.onFinish,
  });

  @override
  State<OnboardingPagePresenter> createState() => _OnboardingPageState();
}

class _OnboardingPageState extends State<OnboardingPagePresenter> {
  int _currentPage = 0;
  final PageController _pageController = PageController(initialPage: 0);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: AnimatedContainer(
        duration: const Duration(milliseconds: 250),
        color: widget.pages[_currentPage].bgColor,
        child: SafeArea(
          child: Column(
            children: [
              Expanded(child: _buildPageView()),
              _buildPageIndicator(),
              _buildBottomButtons(),
            ],
          ),
        ),
      ),
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

  Widget _buildPageView() {
    return PageView.builder(
      controller: _pageController,
      itemCount: widget.pages.length,
      onPageChanged: (idx) {
        setState(() {
          _currentPage = idx;
        });
      },
      itemBuilder: (context, idx) {
        final item = widget.pages[idx];
        return Column(
          children: [
            Expanded(
              flex: 3,
              child: Padding(
                padding: const EdgeInsets.all(32.0),
                child: Image.asset(
                  item.imageUrl,
                ),
              ),
            ),
            _buildDivider(),
            Expanded(
              flex: 1,
              child: Column(children: [
                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Text(item.title,
                      style: Theme.of(context).textTheme.titleLarge?.copyWith(
                            fontWeight: FontWeight.bold,
                            color: item.textColor,
                          )),
                ),
                Container(
                  constraints: const BoxConstraints(maxWidth: 280),
                  padding: const EdgeInsets.symmetric(
                      horizontal: 24.0, vertical: 8.0),
                  child: Text(item.description,
                      textAlign: TextAlign.center,
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                            color: item.textColor,
                          )),
                )
              ]),
            ),
            _buildDivider(),
            const SizedBox(height: 40),
          ],
        );
      },
    );
  }

  Widget _buildPageIndicator() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: widget.pages
          .map((item) => AnimatedContainer(
                duration: const Duration(milliseconds: 250),
                width: _currentPage == widget.pages.indexOf(item) ? 30 : 8,
                height: 8,
                margin: const EdgeInsets.all(2.0),
                decoration: BoxDecoration(
                    color: Colors.black,
                    borderRadius: BorderRadius.circular(10.0)),
              ))
          .toList(),
    );
  }

  Widget _buildBottomButtons() {
    return SizedBox(
      height: 100,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          _buildTextButton("Skip", () {
            if (widget.onSkip != null) {
              widget.onSkip!();
            } else {
              Navigator.pushReplacementNamed(context, '/home');
            }
          }),
          _buildTextButton(
            _currentPage == widget.pages.length - 1 ? "Finish" : "Next",
            () {
              if (_currentPage == widget.pages.length - 1) {
                Navigator.pushReplacementNamed(context, '/home');
              } else {
                _pageController.animateToPage(
                  _currentPage + 1,
                  curve: Curves.easeInOutCubic,
                  duration: const Duration(milliseconds: 250),
                );
              }
            },
          ),
        ],
      ),
    );
  }

  Widget _buildTextButton(String label, VoidCallback? onPressed) {
    return TextButton(
      style: TextButton.styleFrom(
        visualDensity: VisualDensity.comfortable,
        foregroundColor: Colors.black,
        textStyle: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
      ),
      onPressed: onPressed,
      child: Text(label),
    );
  }
}

class OnboardingPageModel {
  final String title;
  final String description;
  final String imageUrl;
  final Color bgColor;
  final Color textColor;

  OnboardingPageModel({
    required this.title,
    required this.description,
    required this.imageUrl,
    this.bgColor = const Color.fromRGBO(224, 224, 224, 1),
    this.textColor = Colors.black,
  });
}
