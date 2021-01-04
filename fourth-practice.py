from flask import Flask,render_template


app = Flask(__name__)


@app.route("/")
def hello():
    return "Hello World!"

@app.route("/wrapAndBound4")
def demo_list4():
    return render_template('fourth-practice.html', heading="bar-chart")


if __name__ == "__main__":
    app.run(port=8000, debug=True)