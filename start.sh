export MIX_ENV=prod
export PORT=4801


SECRET=$(readlink -f ~/.config/bulls)

if [ ! -e "$SECRET/pass" ]; then
	echo "File does not exist"
	exit 1

fi

SECRET_KEY_BASE=$(cat "$SECRET/pass")
export SECRET_KEY_BASE

_build/prod/rel/bulls/bin/bulls start

# TODO: Add a systemd service file
#       to start your app on system boot.
