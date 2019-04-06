<!DOCTYPE HTML>
<html>
<head>
<style>.error {color: #FF0000;}</style>
</head>
<body>

<?php
// define variables and set to empty values
$typeErr = $subErr = $descErr = $emalErr = "";
$type = $subject = $description = $email = "";

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    if (empty($_POST["type"]))
    {
        $typeErr = "Field is required";
    }
    else
    {
        $type = test_input($_POST["type"]);

        if (!preg_match("/^[a-zA-Z]*$/",$type))
        {
            $typeErr = "Only letters allowed";
        }
    }

    if (empty($_POST["subject"]))
    {
        $subErr = "Subject is required";
    }
    else
    {
        $subject = test_input($_POST["subject"]);
    }

    if (empty($_POST["description"]))
    {
        $descErr = "Description is required";
    }
    else
    {
        $description = test_input($_POST["description"]);
    }

    if (empty($_POST["email"]))
    {
        $emailErr = "Email is required";
    }
    else
    {
        $emailErr = test_input($_POST["email"]);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL))
        {
            $emailErr = "Invalid email format";
        }
    }
}
function test_input($data)
    {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }
?>

<h2>Tickets</h2>
<p><span class="error">* required field</span></p>
<form method="post" action="./id.php">
    Type:        <input type="text" name="type" value="<?php echo $type; ?>">
    <span class="error">* <?php echo $typeErr; ?></span>
    <br><br>
    Subject:     <input type="text" name="subject" value="<?php echo $subject; ?>">
    <span class="error">* <?php echo $subErr; ?></span>
    <br><br>
    Description: <textarea name="description" rows="5" cols="40"><?php echo $description; ?>"
    <span class="error">* <?php echo $descErr; ?></span>
    <br><br>
    Email:       <input type="text" name="email" value="<?php echo $email; ?>">
    <span class="error">* <?php echo $emailErr; ?></span>
    <br><br>
    <input type="submit" name="submit" value="Submit">
</form>

<?php

?>

