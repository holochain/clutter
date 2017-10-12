#! /bin/bash

CLONES=2
REPS=4
PAUSE=10
SERVERS=1
for i in "$@"
do
    case $i in
        -r=*|--reps=*)
            REPS="${i#*=}"
            shift # past argument=value
            ;;
        -c=*|--clones=*)
            CLONES="${i#*=}"
            shift # past argument=value
            ;;
        -p=*|--pause=*)
            PAUSE="${i#*=}"
            shift # past argument=value
            ;;
        -s=*|--servers=*)
            SERVERS="${i#*=}"
            shift # past argument=value
            ;;
        --default)
            DEFAULT=YES
            shift # past argument with no value
            ;;
        *)
            # unknown option
            ;;
    esac
done

DURATION=$((PAUSE+2))

cd clutter
git checkout test
cd test/scaling
echo "DURATION:$DURATION"
sed -i "s/!DURATION!/$DURATION/" _config.json
sed -i "s/!CLONES!/$CLONES/" _config.json
sed -i "s/!CLONES!/$CLONES/" clone.json
sed -i "s/!SERVERS!/$SERVERS/" clone.json
sed -i "s/!REPS!/$REPS/" clone.json
sed -i "s/!PAUSE!/$PAUSE/" clone.json
echo "starting hcdev for $SERVER_ID"
$HOME/go/bin/hcdev -bootstrapServer=bootstrap.holochain.net:10000 -keepalive -serverID=fish.$SERVER_ID scenario -outputDir=../results scaling
