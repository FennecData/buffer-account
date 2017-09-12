if [ -n \"$CI\" ]; then jest --config=../../.jestrc.json; else jest --runInBand --config=../../.jestrc.json; fi
