#! /bin/bash

CLONES=2
REPS=4
PAUSE=10
SERVERS=1
KEEPALIVE=""
OUTPUT="-outputDir=../results"
hcd=0
BOOTSTRAP="-bootstrapServer=bootstrap.holochain.net:10000"

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
        -d|--debug)
            DEBUG="-debug"
            shift # past argument with no value
            ;;
        -hcd|--hcdebug)
            hcd="1"
            shift # past argument with no value
            ;;
        -k|--keepalive)
            KEEPALIVE="-keepalive"
            ;;
        -l|--local)
            OUTPUT=""
            BOOTSTRAP="-bootstrapServer=_"
            shift # past argument with no value
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

SERVER_ID=$(<scaling.serverid)

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
cd ../..

killall hcdev

echo "HCDEBUG=$hcd $HOME/go/bin/hcdev $DEBUG $BOOTSTRAP $KEEPALIVE -serverID=server.$SERVER_ID scenario $OUTPUT scaling"
HCDEBUG=$hcd $HOME/go/bin/hcdev $DEBUG $BOOTSTRAP $KEEPALIVE -serverID=server.$SERVER_ID scenario $OUTPUT scaling
